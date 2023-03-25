import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
		imageUrl: string,
		title: string,
		price: number
	}>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://641419c950dff8e8fe4515c4.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Такой пиццы не существует');
        navigate('/');
      }
    }
    fetchPizza();
    // eslint-disable-next-line
  }, []);

  if (!pizza) {
    return <>...Загрузка</>;
  }

  return (
    <div className="container">
      <img alt="" src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>

      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;

