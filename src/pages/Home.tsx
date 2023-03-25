import React from 'react';
import { useSelector } from 'react-redux';


import { selectFilter, setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

// import qs from 'qs';
// import { useNavigate } from 'react-router-dom';
const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const onChangeCategory = React.useCallback((idx: number) => {
		dispatch(setCategoryId(idx));
  // eslint-disable-next-line
	}, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  React.useEffect(() => {
    const getPizzas = async () => {
      const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
      const sortBy = sort.sortProperty.replace('-', '');
      const category = categoryId > 0 ? `category=${categoryId}` : '';
      const search = searchValue ? `&search=${searchValue}` : '';

      dispatch(
				fetchPizzas({ order, sortBy, category, search, currentPage: String(currentPage) }));

      window.scrollTo(0, 0);
    };

    getPizzas();
    // eslint-disable-next-line
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // React.useEffect(() => {
  //   const queryString = qs.stringify({
  //     sortProperty: sort.sortProperty,
  //     categoryId,
  //     currentPage,
  //   });
  //   navigate(`?${queryString}`);
  // }, [sort.sortProperty, categoryId, currentPage]);

  const pizzas = items.map((obj: any) => (
    
      <PizzaBlock key={obj.id} {...obj} />
    
  ));
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
    <Sort />
				</div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>Не удалось получить пиццы.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}



export default Home;
