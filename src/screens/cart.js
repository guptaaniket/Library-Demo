import React, { Component } from "react";
import Navbar from "../components/navbar";
import { ButtonToggle } from "reactstrap";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import "../styles/style.css";
import "../styles/toast.css";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      author: "",
      description: "",
      price: null,
      list: null,
      count: null,
      totalPrice: null,
    };
  }

  componentDidMount() {
    this.getData();
    this.totalPrice();
  }

  onDeleteItem(id) {
    console.log("delete", id);
    const item = localStorage.getItem("item")
      ? JSON.parse(localStorage.getItem("item"))
      : [];
    var index;
    for (let i = 0; i < item.length; i++) {
      if (item[i].id === id) {
        index = i;
        break;
      }
    }
    if (index === undefined) return;
    item.splice(index, 1);
    localStorage.setItem("item", JSON.stringify(item));
    this.getData();
  }

  orderNow() {
    const item = localStorage.getItem("item")
      ? JSON.parse(localStorage.getItem("item"))
      : [];
    console.log("item", item.length);
    if (item.length !== 0) {
      localStorage.removeItem("item");
      toast.success("Order is placed !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      window.location.reload();
      this.getData();
    } else {
      toast.error("Please add a Book !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      this.getData();
      return;
    }
  }

  totalPrice() {
    const item = localStorage.getItem("item")
      ? JSON.parse(localStorage.getItem("item"))
      : [];
    console.log("p,data", item.length);
    if (item.length > 0) {
      let sum = item
        .map((data) => data.price)
        .reduce((a, c) => {
          return +a + +c;
        });
      this.setState({
        totalPrice: sum,
      });
    } else {
      return "";
    }
  }

  getData() {
    const items = localStorage.getItem("item")
      ? JSON.parse(localStorage.getItem("item"))
      : [];
    if (items.length !== 0) {
      this.setState({ list: items, count: items.length });
    } else {
      toast.error("Your cart is empty !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
  }

  render() {
    const data = this.state.list;
    const totalPrice = this.state.totalPrice;
    return (
      <div>
        <Navbar />
        <div className="container">
          <h4>Cart : {this.state.count || 0}</h4>
          <div className="partition"></div>
          <div style={{ marginTop: "1rem" }}>
            {data ? (
              data.map((item) => (
                <Card className="cart-data">
                  <h4 style={{width:"33%"}}>{item.name}</h4>
                  <h4 style={{width:"33%"}}>{item.author}</h4>
                  <h4 style={{width:"33%"}}>${item.price}</h4>
                  <div>
                    <Button
                      className="deleteBtn"
                      variant="light"
                      onClick={() => {
                        this.onDeleteItem(item.id);
                      }}
                    >
                      ×
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <h3 className="loader mt-5">Your cart is Empty</h3>
            )}
            <Card className="total-pp">
              <h4>Price : ${totalPrice || 0} </h4>
              <h4 style={{ marginLeft: "1rem" }}>
                Items : {this.state.count || 0}
              </h4>
              <div>
                <ButtonToggle
                  className="ordrbtn"
                  color="secondary"
                  onClick={() => {
                    this.orderNow();
                  }}
                >
                  Place Order
                </ButtonToggle>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
