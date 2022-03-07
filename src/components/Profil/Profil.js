import React, { Component, Input, useEffect, useState } from "react";
import { Col, Row, Container, Button, Modal } from "react-bootstrap";
import QrCode from "../../assets/components/QRCode/QrCode";
import QrCodeTicket from "../../assets/QRCodeTicket/QRCodeTicket";
import "./profil.css";
import { Redirect } from "react-router-dom";
import storage from "../../firebase";
import Image from "react-bootstrap/Image";

function UploadPicture() {
  const [imageStorage, setImageStorage] = useState("");
  const [images, setImages] = useState("");
  const [label, setLabel] = useState("");
  const [message, setMessage] = useState("");
  const [dailyMenu, setDailyMenu] = useState({});

  const getMonProfil = () => {
    const headers = new Headers({
      Authorization: "Bearer " + localStorage.getItem("token"),

      "X-Requested-With": "XMLHttpRequest",
    });

    const options = {
      method: "GET",
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/restaurateur/profil", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          console.log(responseObject);
          setImages(responseObject.logo);
        },

        (error) => {
          console.log(error);
        }
      );
  };

  const modifProfilLogo = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const headers = new Headers({
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "PUT",
      body: data,
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/profil/edit/logo",
      options
    )
      .then((response) => {
        return response.json();
      })

      .then(
        (responseObject) => {
          setMessage(responseObject.message);
          const headers = new Headers({
            Authorization: "Bearer " + localStorage.getItem("token"),

            "X-Requested-With": "XMLHttpRequest",
          });

          const options = {
            method: "GET",
            headers: headers,
          };

          fetch(
            "https://back-end.osc-fr1.scalingo.io/restaurateur/profil",
            options
          )
            .then((response) => {
              return response.json();
            })
            .then(
              (responseObject) => {
                setImageStorage(responseObject.logo);
                getMonProfil();
              },

              (error) => {
                console.log(error);
              }
            );
        },

        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    getMonProfil();
  }, []);

  return (
    <Col className="addImage">
      <h1 className="title">Mon Logo </h1>
      <form onSubmit={modifProfilLogo} className="formLogo">
        <img
          className="restaurantLogo"
          src={"https://s3.amazonaws.com/b.c.bucket.tipourboire/" + images}
        ></img>
        <br />
        <br />
        <input
          type="file"
          name="file"
          onChange={(e) => {
            setImageStorage(e.target.files[0]);
          }}
        />
        <br />
        <button className="buttonVal" type="submit">
          Valider
        </button>
      </form>
    </Col>
  );
}

class Profil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profil: {},
      editing: true,
      show: false,
      redirect: false,
      checkGeneral: false,
      checkIndividuel: false,
    };
  }

  handleShow = () => {
    this.setState({ show: true });
  };
  handleClose = () => {
    this.setState({ show: false });
  };
  // renderButtonSub = () => {
  //   if (this.state.profil.abonne === true) {
  //     return (
  //       <div>
  //         <button
  //           className="signOut button"
  //           variant="primary"
  //           onClick={() => {
  //             this.props.history.push("/dataClient");
  //           }}>
  //           Accès à mon espace premium <br />
  //         </button>
  //       </div>
  //     );
  //   } else {
  //     return (
  //       <div>
  //         <button
  //           className="signOut button"
  //           variant="primary"
  //           onClick={() => {
  //             this.props.history.push("/abonnement");
  //           }}>
  //           Souscrire à l'abonnement Premium <br />
  //         </button>
  //       </div>
  //     );
  //   }
  // };
  buttonEdit = () => {
    if (this.state.editing == true) {
      return (
        <>
          <button
            className="button"
            onClick={() => {
              this.setState({ editing: false });
            }}
          >
            Modifier <br />
          </button>
        </>
      );
    } else {
      return (
        <button className="button" onClick={this.putProfilOnClick}>
          Confirmer Modification
        </button>
      );
    }
  };

  buttonCancel = () => {
    if (this.state.editing == false) {
      return (
        <button
          className="button"
          onClick={() => {
            this.setState({ editing: true });
            this.getMonProfil();
          }}
        >
          Annuler
        </button>
      );
    }
  };

  handleInput = (event) => {
    let profil = this.state.profil;
    profil[event.target.name] = event.target.value;
    this.setState({
      profil: profil,
      // identifier name de l'input = choisir la valeur qui se trouve dans l'input
    });
  };

  /* Affichage Profil */
  getMonProfil = () => {
    const headers = new Headers({
      Authorization: "Bearer " + localStorage.getItem("token"),

      "X-Requested-With": "XMLHttpRequest",
    });

    const options = {
      method: "GET",
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/restaurateur/profil", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          localStorage.setItem(
            "propsRestaurant",
            JSON.stringify(responseObject.restaurantName)
          );
          const monProfil = responseObject;
          this.setState({ profil: monProfil });

          this.setState({ checkGeneral: responseObject.pourboireGeneral });
          this.setState({
            checkIndividuel: responseObject.pourboireIndividuel,
          });
        },

        (error) => {
          console.log(error);
        }
      );
  };

  unSubscription = () => {
    const headers = new Headers({
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "POST",
      headers: headers,
    };

    fetch("https://back-end.osc-fr1.scalingo.io/restaurateur/delete", options)
      .then((response) => {
        return response.json();
      })
      .then(
        (responseObject) => {
          this.setState({ profil: responseObject });
        },

        (error) => {
          console.log(error);
        }
      );
  };

  /* Modification du profil */
  modifProfil = () => {
    const data = {
      restaurantName: this.state.profil.restaurantName,
      bossName: this.state.profil.bossName,
      adress: this.state.profil.adress,
      city: this.state.profil.city,
      email: this.state.profil.email,
      bossFirstName: this.state.profil.bossFirstName,
      phone: this.state.profil.phone,
      pourboireGeneral: this.state.checkGeneral,
      pourboireIndividuel: this.state.checkIndividuel,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/profil/edit",
      options
    )
      .then((response) => {
        return response.json();
      })

      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
          this.setState({ editing: true });
          this.getMonProfil();
        },

        (error) => {
          console.log(error);
        }
      );
  };

  /* Modification du logo */
  modifProfilLogo = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const headers = new Headers({
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "PUT",
      body: data,
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/restaurateur/profil/edit/logo",
      options
    )
      .then((response) => {
        return response.json();
      })

      .then(
        (responseObject) => {
          this.setState({ message: responseObject.message });
          this.getMonProfil();
        },

        (error) => {
          console.log(error);
        }
      );
  };

  postParrainage = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
    };

    const headers = new Headers({
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      Authorization: "Bearer " + localStorage.getItem("token"),
    });

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    };

    fetch(
      "https://back-end.osc-fr1.scalingo.io/serveur/emailParrainage?_id=" +
        this.state.email +
        "&mailSender=" +
        this.state.profil.email,
      options
    )
      .then((response) => {
        return response.json();
      })

      .then((responseData) => {
        this.setState({ message: responseData.message });
      });
  };

  putProfilOnClick = () => {
    this.modifProfil();
  };

  componentDidMount() {
    this.getMonProfil();

    console.log("stateIndiv", this.state.checkIndividuel);
    console.log("stateIndiv", this.state.checkGeneral);
  }

  render() {
    return (
      <Container className="styleProfil parrainage">
        <UploadPicture />
        <Row>
          <Col md={12} className="formProfil ">
            <h1 className="title">Mes informations </h1>
            <p>
              {this.state.editing ? (
                <h1 className="textProfilTitre">
                  {this.state.profil.restaurantName}
                </h1>
              ) : (
                <input
                  type="text"
                  Value={this.state.profil.restaurantName}
                  name="restaurantName"
                  onChange={this.handleInput}
                />
              )}
            </p>
            <p>
              {this.state.editing ? (
                <span className="textProfil">
                  {this.state.profil.bossFirstName}
                </span>
              ) : (
                <input
                  type="text"
                  name="bossFirstName"
                  placeholder="Prénom"
                  onChange={this.handleInput}
                  Value={this.state.profil.bossFirstName}
                />
              )}
            </p>

            <p>
              {this.state.editing ? (
                <span className="textProfil">{this.state.profil.bossName}</span>
              ) : (
                <input
                  type="text"
                  name="bossName"
                  placeholder="Nom"
                  onChange={this.handleInput}
                  Value={this.state.profil.bossName}
                />
              )}
            </p>
            <p>
              {this.state.editing ? (
                <span className="textProfil">{this.state.profil.adress}</span>
              ) : (
                <input
                  type="text"
                  name="adress"
                  placeholder="Adresse"
                  onChange={this.handleInput}
                  Value={this.state.profil.adress}
                />
              )}
            </p>
            <p>
              {this.state.editing ? (
                <span className="textProfil">{this.state.profil.city}</span>
              ) : (
                <input
                  type="text"
                  name="city"
                  placeholder="Ville"
                  onChange={this.handleInput}
                  Value={this.state.profil.city}
                />
              )}
            </p>
            <p>
              {this.state.editing ? (
                <span className="textProfil">{this.state.profil.email}</span>
              ) : (
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={this.handleInput}
                  Value={this.state.profil.email}
                />
              )}
            </p>
            <p>
              {this.state.editing ? (
                <span className="textProfil">{this.state.profil.phone}</span>
              ) : (
                <input
                  type="text"
                  Value={this.state.profil.phone}
                  placeholder="Téléphone"
                  name="phone"
                  onChange={this.handleInput}
                />
              )}
            </p>
            {this.state.editing ? (
              <div>
                <span className="textProfil">
                  {this.state.profil.pourboireGeneral
                    ? "Pourboire Général Autorisé"
                    : "Pourboire Général Refusé"}
                </span>
                <br />
                <span className="textProfil">
                  {this.state.profil.pourboireIndividuel
                    ? "Pourboire Individuel Autorisé"
                    : "Pourboire Individuel Refusé"}
                </span>
              </div>
            ) : (
              <div>
                <div>
                  <input
                    className="labelMargin"
                    type="checkbox"
                    id="individuel"
                    name="individuel"
                    checked={this.state.checkIndividuel}
                    onChange={() => {
                      this.setState({
                        checkIndividuel: !this.state.checkIndividuel,
                      });
                    }}
                  />
                  <label for="individuel">Pourboire individuel</label>
                </div>
                <div>
                  <input
                    className="labelMargin"
                    type="checkbox"
                    id="general"
                    name="general"
                    checked={this.state.checkGeneral}
                    onChange={() => {
                      this.setState({ checkGeneral: !this.state.checkGeneral });
                    }}
                  />
                  <label className="labelMargin" for="general">
                    Pourboire Général
                  </label>
                </div>
              </div>
            )}

            {this.buttonEdit()}

            {this.buttonCancel()}
          </Col>
          <Row>
            <Col className="colParrainage">
              <Row>
                <Col md={12}>
                  <label className="demandeParrainage">
                    Parrainer un Serveur et/ou Restaurateur
                  </label>
                </Col>
              </Row>
              <Row className="rowParrain">
                <Col>
                  <input
                    type="text"
                    name="email"
                    onChange={this.handleInput}
                    placeholder="Email du parrainé"
                    className="inputParrainage"
                  />
                </Col>
                <Col>
                  <input
                    type="submit"
                    value="Envoyer"
                    onClick={this.postParrainage}
                    className="buttonParrainage"
                  />
                  <p className="infoParrainage">
                    " Vous êtes satisfaits : parlez-en autour de vous ! A chaque
                    parrainage d'un restaurateur, vous et votre confrère gagnez
                    2 mois d'abonnements Premium "
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
          <Col className="formProfil nomProfil center">
            <h1 className="title">Mes QR Codes </h1>
            <Row className="rowCenter">
              <Col xs={6} md={6}>
                <p>QR CODE pourboire de votre établissement </p>
                <p className="qrSub">
                  à insérer sur vos tickets d'addition depuis votre logiciel de
                  caisse
                </p>

                <QrCodeTicket
                  className="qrCodeTicket"
                  restaurantName={localStorage.getItem("propsRestaurant")}
                />
              </Col>
            </Row>
            <Row className="rowCenter">
              <Col xs={6} md={6}>
                <p className="qr"> QR CODE carte </p>
                <p className="qrSub">
                  À télécharger pour impression sur vos supports ou insertion
                  dans votre logiciel de caisse ou d'encaissement.
                </p>

                <QrCode
                  className="qrCode"
                  restaurantName={localStorage.getItem("propsRestaurant")}
                />
              </Col>
            </Row>

            <br />
            <Button
              onClick={() => {
                window.confirm("Voulez vous vous déconnecter ?");

                this.props.setLogin(false);
                this.props.history.push("/");
              }}
              className="signOut1 button"
            >
              Déconnexion
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Profil;
