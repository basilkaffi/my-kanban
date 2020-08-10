import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getItem } from '../store/actions/crudAction';
import CategoryBar from '../components/CategoryBar';

function AppPage() {
  const dispatch = useDispatch()
  const categories = ['backlog', 'todo', 'done', 'completed']

  useEffect(() => {
    dispatch(getItem())
  }, [dispatch])

  return (
    <div className="AppPage background">
      <div className="divider">
        {categories.map(category => <CategoryBar category ={category} />)}
      </div>
    </div>
  );
}

export default AppPage;