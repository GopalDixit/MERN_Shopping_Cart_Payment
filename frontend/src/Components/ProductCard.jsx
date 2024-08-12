import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const VITE_BACKEND_HOST_URL = `https://mern-shopping-cart-payment.onrender.com`;

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/home');
};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${VITE_BACKEND_HOST_URL}/api/addproduct/read`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  const handlePayment = async (amount) => {
    const backendUrl = VITE_BACKEND_HOST_URL;

    if (!backendUrl) {
      console.error('VITE_BACKEND_HOST_URL variable is not defined');
      return; // Prevent unnecessary fetch if URL is missing
    }

    const URL = `${backendUrl}/api/payment/order`;

    try {
      setIsLoading(true);
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        throw new Error("Payment failed");
      }

      const data = await res.json();
      console.log("Data is", data);
      handlePaymentVerify(data.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error processing payment:", error);
      setError(error.message);
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
        console.log("response", response)
        try {
          const res = await fetch(`${({}).VITE_BACKEND_HOST_URL}/api/payment/verify`, {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            })
          })

          const verifyData = await res.json();

          if (verifyData.message) {
            toast.success(verifyData.message)
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
    <button onClick={handleNavigate} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"style={{marginBottom:18,marginRight:400}}>Home</button>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <Card key={product._id} className="w-full">
          <CardHeader color="blue-gray" className="h-60">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {product.name}
            </Typography>
            <Typography>
              {product.description}
            </Typography>
            <h1 className="font-serif text-xm">{product.price}$</h1>
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={() => handlePayment(product.price)} disabled={isLoading}>
              {/* {isLoading ? "Processing..." : "Buy Now"} */}
              Buy Now
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
    </div>
  );
  
};

export default ProductCard;
