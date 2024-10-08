import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import Modal from 'react-modal'; 

const VITE_BACKEND_HOST_URL = `https://mern-shopping-cart-payment.onrender.com`;

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [fakeProducts, setFakeProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/home');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_HOST_URL}/api/addproduct/read`);
        if (!response.ok) throw new Error('Failed to fetch custom products');
        const data = await response.json();
        setProducts(data.products);

        const fakeResponse = await fetch('https://fakestoreapi.com/products');
        if (!fakeResponse.ok) throw new Error('Failed to fetch fake products');
        const fakeData = await fakeResponse.json();
        setFakeProducts(fakeData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, []);

  const handlePayment = async (amount) => {
    const backendUrl = VITE_BACKEND_HOST_URL;
    const URL = `${backendUrl}/api/payment/order`;

    try {
      setIsLoading(true);
      const res = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) throw new Error("Payment failed");

      const data = await res.json();
      console.log("Data is", data);
      handlePaymentVerify(data.data);
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: ({}).RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Gopal Dixit",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        try {
          const res = await fetch(`${({}).VITE_BACKEND_HOST_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          });

          const verifyData = await res.json();
          if (verifyData.message) {
            toast.success(verifyData.message);
          }
        } catch (error) {
          console.error(error);
        }
      },
      theme: { color: "#5f63b8" }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleNavigate} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" style={{ marginBottom: 18 }}>Logout</button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {/* Render your custom API products */}
        {products.map((product) => (
          <Card key={product._id} className="w-full m-4 h-auto cursor-pointer" onClick={() => openModal(product)}>
            <CardHeader color="blue-gray" className="h-auto">
              <img src={product.image} alt={product.name} className="h-auto w-auto object-contain" />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">{product.name}</Typography>
              <Typography className="truncate">{product.description}</Typography> {/* One line description */}
              <h1 className="font-serif text-xm">₹{product.price}</h1>
            </CardBody>
            <CardFooter className="pb-1">
              <Button onClick={() => handlePayment(product.price)} disabled={isLoading}>Buy Now</Button>
            </CardFooter>
          </Card>
        ))}

        {/* Render Fake Store API products */}
        {fakeProducts.map((product) => (
          <Card key={product.id} className="w-auto m-4 cursor-pointer" onClick={() => openModal(product)}>
            <CardHeader color="blue-gray">
              <img src={product.image} alt={product.title} className="h-auto w-auto object-contain" />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">{product.title}</Typography>
              <Typography className="truncate">{product.description}</Typography> {/* One line description */}
              <h1 className="font-serif text-xm">₹{product.price}</h1>
            </CardBody>
            <CardFooter className="pt-0">
              <Button onClick={() => handlePayment(product.price)} disabled={isLoading}>Buy Now</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Modal for displaying product details */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} ariaHideApp={false}>
  <div className="p-4 flex flex-col items-center">
    {selectedProduct && (
      <div className="text-black flex flex-col items-center">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name || selectedProduct.title}
          className="h-80 w-40 object-contain mb-4"
        />
        <h2 className="text-lg font-bold">{selectedProduct.name || selectedProduct.title}</h2>
        <p className="line-clamp-1">{selectedProduct.description}</p>
        <h1 className="font-serif text-xl">₹{selectedProduct.price}</h1>
        <Button onClick={() => handlePayment(selectedProduct.price)} disabled={isLoading}>
          Buy Now
        </Button>
      </div>
    )}
    <Button onClick={closeModal} className="mt-4">Close</Button>
  </div>
</Modal>

    </div>
  );
};

export default ProductCard;

