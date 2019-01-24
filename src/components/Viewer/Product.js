import React from "react";
import styled from "styled-components";

const ProductStyle = styled.div`
  color: darkgreen;
  background-color: #fff;
  height: 200px;
  box-shadow: 0px 0px 4px 1px #a2d9a2;
  padding: 30px;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0px 0px 20px 2px lightgreen;
    transform: translateY(-3px);
    cursor: pointer;
  }

  h2 {
    margin: 10px 0;
  }

  .description {
    color: seagreen;
    font-style: italic;
  }

  .divider {
    display: flex;
    height: 100%;
  }

  .left-section {
    flex-grow: 0.9;
  }

  .right-section {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 30%;
    justify-content: space-between;
  }

  .cost {
    margin-top: 10px;
    text-align: center;
  }

  .sell-buy {
    display: flex;
    justify-content: space-around;

    input {
      width: 30px;
      padding: 5px;
      border: 1px solid darkgreen;
      border-radius: 15px;
      text-align: center;
      box-shadow: 2px 2px 4px 1px #ddd inset;

      &:focus {
        outline: none;
      }

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }

  .price {
    font-size: 28px;
    color: limegreen;
  }

  button {
    width: 60px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid lightgreen;
    border-radius: 10px;
    background-color: #fff;
    color: limegreen;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      background-color: lightgreen;
      color: #fff;
    }

    &:focus {
      outline: 0;
    }

    &:active {
      background-color: greenyellow;
      border: 1px solid greenyellow;
    }
  }

  .buy-button {
    opacity: ${props =>
      props.money < props.price || props.inStock <= 0 ? "0.3" : "1"};
    ${props =>
      props.money < props.price || props.inStock <= 0
        ? "pointer-events: none"
        : ""};
  }

  .sell-button {
    opacity: ${props => (!props.youHave ? "0.3" : "1")};
    ${props => (!props.youHave ? "pointer-events: none" : "")};
  }
`;

const B = styled.span`
  font-weight: 800;
`;

export default class Product extends React.Component {
  state = {
    amountBought: 1
  };

  getAmountBought = e => {
    e.preventDefault();
    const amount = e.target.value;

    this.setState(
      () => ({
        amountBought: amount
      }),
      () => console.log(this.state.amountBought)
    );
  };

  render() {
    return (
      <ProductStyle
        money={this.props.money}
        price={this.props.price}
        youHave={this.props.youHave}
        inStock={this.props.inStock}
      >
        <div className="divider">
          <div className="left-section">
            <h2>{this.props.title}</h2>
            <p className="description">{this.props.description}</p>
            <p>--------------------------</p>
            <span>
              Currently available:{" "}
              <B>
                {this.props.inStock <= 0 ? "Out of stock" : this.props.inStock}
              </B>
            </span>
            <br />
            <span>
              You have: <B>{this.props.youHave}</B>
            </span>
          </div>
          <div className="right-section">
            <div className="cost">
              <span>Price:</span>
              <br />
              <span className="price">
                {parseFloat(this.props.price).toFixed(2)} $
              </span>
            </div>
            <div className="sell-buy">
              <button
                className="sell-button"
                onClick={() => this.props.sellProduct(this.props)}
              >
                SELL
              </button>
              <input
                className="amount"
                type="number"
                defaultValue="1"
                onChange={e => this.getAmountBought(e)}
              />
              <button
                className="buy-button"
                onClick={() => this.props.buyProduct(this.props)}
              >
                BUY
              </button>
            </div>
          </div>
        </div>
      </ProductStyle>
    );
  }
}

Product.defaultProps = {
  title: "Unnamed",
  description: "This is an unnamed thing available for trade.",
  inStock: 100,
  youHave: 0,
  price: 100.0
};
