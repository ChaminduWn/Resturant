import Header from "../components/Header";
import PayForm from "../components/PaymentForm";
import PayNow from "../components/PayNow";

const Payment = (props) => {
  // Check if props.location and props.location.state exist before accessing them
  const cartData =
    props.location && props.location.state ? props.location.state.cartData : [];
  console.log("Cart Data:", cartData);
  return (
    <>
      <Header />
      <PayNow />
    </>
  );
};

export default Payment;