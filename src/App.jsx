import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateArticle from "./components/Article/CreateAtricle";
import ArticleList from "./components/Article/ArticleList";
import CreateOrder from "./components/Order/CreateOrder";
import OrderList from "./components/Order/OrderList";
import Article from "./components/Article/Article";
import Order from "./components/Order/Order";
import Header from "./components/Header";
import UpdateArticle from "./components/Article/UpdateArticle";
import UpdateOrder from "./components/Order/UpdateOrder";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:id" element={<Article />} />
        <Route path="/articles/new" element={<CreateArticle />} />
        <Route path="/articles/:id/update" element={<UpdateArticle />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/orders/new" element={<CreateOrder />} />
        <Route path="/orders/:id/update" element={<UpdateOrder />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
