import {
    collection,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    updateDoc,
    where,
  } from 'firebase/firestore';
  import { auth, db } from '../firebase';
import { scoreType } from '../types';

export const handleAddScore = async (score: number, quizId: string) => {
      console.log("result",score)
      const currUser = auth.currentUser
      const q = query(collection(db, 'users'), where('uid', '==', currUser?.uid))
      let userData: {id: string, data: any} = {id: '', data: {}}
      const queryRes = await getDocs(q)
      queryRes.forEach(document => {
        userData.id = document.id
        userData.data = document.data()
      })
      if(userData.data.score.find((item: scoreType) => item.quizId === quizId)) {
        await updateDoc(doc(db, 'users', userData.id), {
            score: userData.data.score.map((item: scoreType) => 
                (item.quizId === quizId) ? {...item, score} :item
            )
        })
      }
      else {
          if(userData.id){
              await updateDoc(doc(db, 'users', userData.id), {
                  score: userData.data.score.concat({quizId, score})
              })
          }
      }
  }