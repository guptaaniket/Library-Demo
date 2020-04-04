import React, { Component } from "react";
import { ButtonToggle } from "reactstrap";
import Navbar from "../components/navbar";
import { toast } from "react-toastify";
import "../styles/style.css";
import "../styles/toast.css";
import {
  Card,
  Col,
  Button,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "react-bootstrap";
toast.configure();

export default class Booklist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      author: "",
      description: "",
      price: "",
      list: null,
      show: false,
      searchData: null,
      noData: false
    };
  }

  //form model
  handkeModel() {
    this.setState({ show: !this.state.show });
  }

  componentDidMount() {
    this.getData();
  }

  //get books data
  getData() {
    fetch("http://localhost:3000/library").then(response => {
      response.json().then(res => {
        console.log("res", res[0].id);
        this.setState({ list: res });
      });
    });
  }

  //add new book
  addBook() {
    const obj = {
      id: this.state.id,
      name: this.state.name,
      author: this.state.author,
      description: this.state.description,
      price: this.state.price
    };
    if (
      obj.id === "" ||
      obj.name === "" ||
      obj.author === "" ||
      obj.description === "" ||
      obj.price === ""
    ) {
      toast.error("All fields are required !", {
        position: toast.POSITION.TOP_RIGHT
      });
      return;
    } else {
      fetch("http://localhost:3000/library/", {
        method: "Post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      }).then(res => {
        res.json().then(resp => {
          toast.success("New book is added !", {
            position: toast.POSITION.TOP_RIGHT
          });
          this.handkeModel();
          window.location.reload();
        });
      });
    }
  }

  //delete book
  deleteBook(id) {
    fetch("http://localhost:3000/library/" + id, {
      method: "Delete"
    }).then(res => {
      res.json().then(resp => {
        toast.success("Book is deleted !", {
          position: toast.POSITION.TOP_RIGHT
        });
        this.getData();
      });
    });
  }

  //search book
  searchData(key) {
    fetch("http://localhost:3000/library?q=" + key).then(data => {
      data.json().then(resp => {
        console.log("resp", resp);
        if (resp.length > 0) {
          this.setState({ list: resp, noData: false });
        } else {
          this.setState({ noData: true, list: resp });
        }
      });
    });
  }

  render() {
    const userType = localStorage.getItem("login");
    const data = JSON.parse(userType);
    console.log("data", data[0].name);
    return (
      <div>
        <Navbar />
        <div className="container">
          <div className="mb">
            <input
              className="search-box"
              type="text"
              placeholder="Search.."
              name="search"
              onChange={e => {
                this.searchData(e.target.value);
              }}
            ></input>
            {console.log("this.props", localStorage)}
            {data[0].name == "admin" && (
              <ButtonToggle
                className="aln-lft"
                color="secondary"
                onClick={() => {
                  this.handkeModel();
                }}
              >
                Add Book
              </ButtonToggle>
            )}
          </div>
          <Modal
            show={this.state.show}
            onHide={() => {
              this.handkeModel();
            }}
          >
            <Modal.Header closeButton className="ctr-aln">
              <b>Enter New Book Details</b>{" "}
            </Modal.Header>
            <ModalBody>
              <form class="login-form">
                <Row className="form-group model-input">
                  {" "}
                  <input
                    class="form-control"
                    type="text"
                    name="id"
                    onChange={e => {
                      this.setState({ id: e.target.value });
                    }}
                    placeholder="id"
                    required
                  />
                </Row>
                <br />
                <Row className="form-group model-input">
                  <input
                    class="form-control"
                    type="text"
                    name="name"
                    onChange={e => {
                      this.setState({ name: e.target.value });
                    }}
                    placeholder="Book Name"
                    required
                  />
                </Row>
                <br />
                <Row className="f-group model-input">
                  <input
                    class="form-control"
                    type="text"
                    name="author"
                    onChange={e => {
                      this.setState({ author: e.target.value });
                    }}
                    placeholder="Author Name"
                    required
                  />
                </Row>
                <br />
                <Row className="form-group model-input">
                  <input
                    class="form-control"
                    type="text"
                    name="description"
                    onChange={e => {
                      this.setState({ description: e.target.value });
                    }}
                    placeholder="About Book"
                    required
                  />
                </Row>
                <br />
                <Row className="form-group model-input">
                  <input
                    class="form-control"
                    type="text"
                    name="price"
                    onChange={e => {
                      this.setState({ price: e.target.value });
                    }}
                    placeholder="Price"
                    required
                  />
                </Row>
                <br />
              </form>
            </ModalBody>
            <ModalFooter>
              <ButtonToggle
                color="secondary"
                type="submit"
                onClick={() => {
                  this.addBook();
                }}
              >
                Submit
              </ButtonToggle>
            </ModalFooter>
          </Modal>

          <div className="partition"></div>
          {this.state.list ? (
            <div className="book-Card mt-1">
              {this.state.list.map((item, i) => (
                <Card className="card-dsn">
                  {/* <span >{item.id}</span> */}
                  <h4 style={{ textAlign: "center" }}>{item.name}</h4>
                  <p>{item.description}</p>
                  <b>by-/{item.author}</b>
                  <b>Price:{item.price}</b>
                  {data[0].name == "admin" && (
                    <ButtonToggle
                      className="mt"
                      color="danger"
                      onClick={() => {
                        this.deleteBook(item.id);
                      }}
                    >
                      Delete
                    </ButtonToggle>
                  )}
                  {data[0].name == "user" && (
                    <ButtonToggle className="mt" color="secondary">
                      Buy
                    </ButtonToggle>
                  )}
                </Card>
              ))}
            </div>
          ) : (
            <h3 className="loader mt-5">Please Wait......</h3>
          )}
        </div>
      </div>
    );
  }
}
