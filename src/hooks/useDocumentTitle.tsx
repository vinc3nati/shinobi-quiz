import {useEffect} from 'react'
import { capitalize } from '../utils';

export const useDocumentTitle = (title: string) => {
    useEffect(() => {
      document.title = `Shinobi Watch | ${capitalize(title)}`;
    }, [title]);
  };
  