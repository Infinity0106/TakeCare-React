import React from 'react';

import {
  Page,
  Panel,
  Breadcrumbs,
  Select,
  Button,
  Table,
  TableBody,
  TableHead,
  eventBus,
} from 'react-blur-admin';
import { Link } from 'react-router';
import { Row, Col } from 'react-flex-proto';
import Config from './config';

export class Cambio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lideres: [],
      areas: [],
      empleados: [],
      datos: {
        lider: '',
        areanueva: '',
        nuevoLider: '',
      },
    };
  }

  componentWillMount() {
    this.getLideres();
    this.getAreas();
  }

  getLideres() {
    fetch(Config.api + '/doctores/lideres')
      .then(response => response.json())
      .then(responseJson => {
        var tmp = [];
        responseJson.forEach(element => {
          tmp.push({
            value: element,
            label: element.fname + ' ' + element.lider,
          });
        });
        this.setState({ lideres: tmp });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getAreas() {
    fetch(Config.api + '/areas')
      .then(response => response.json())
      .then(responseJson => {
        var tmp = [];
        responseJson.forEach(element => {
          tmp.push({ value: element, label: element.nombre });
        });
        this.setState({ areas: tmp });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getEmpleados() {
    console.log(this.state.datos.lider.lider);
    fetch(Config.api + '/doctores/empeados/' + this.state.datos.lider.lider)
      .then(response => response.json())
      .then(responseJson => {
        var tmp = [];
        responseJson.forEach(element => {
          console.log(element);
          tmp.push({
            value: element,
            label: element.fname,
          });
        });
        console.log(tmp);
        this.setState({ empleados: tmp });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to="/">Home</Link>
        Cambio de cargo
      </Breadcrumbs>
    );
  }
  isEmpty(str) {
    return !str || 0 === str.length;
  }
  changePerson() {
    if (
      typeof this.state.datos.lider != 'string' &&
      typeof this.state.datos.areanueva != 'string' &&
      typeof this.state.datos.nuevoLider != 'string'
    ) {
      fetch(Config.api + '/doctores/cambio', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          areanueva: this.state.datos.areanueva,
          lider: this.state.datos.lider,
          nuevolider: this.state.datos.nuevoLider,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson.res1 && responseJson.res2) {
            this.setState({
              datos: Object.assign(
                {},
                {
                  lider: '',
                  areanueva: '',
                  nuevoLider: '',
                }
              ),
            });
            eventBus.addNotification('success', 'Doctor cambiado exitosamente');
          } else {
            eventBus.addNotification(
              'error',
              'no se ha podido cambiar el doctor'
            );
          }
        })
        .catch(e => {
          console.log(e);
        });
      console.log(this.state.datos);
    } else {
      eventBus.addNotification('error', 'no se ha podido cambiar lider');
    }
  }

  renderTable() {
    return null;
  }
  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title="Cambiar cargo doctor">
        <Panel title="Hacer cambio">
          <Row>
            <Col>
              <div className="form-group">
                <label className="control-label">Lider a cambiar</label>
                <Select
                  placeholder="Lider a cambiar"
                  value={this.state.datos.lider}
                  options={this.state.lideres}
                  onChange={value => {
                    this.setState(
                      {
                        datos: Object.assign({}, this.state.datos, {
                          lider: value,
                        }),
                      },
                      () => {
                        this.getEmpleados(value);
                      }
                    );
                  }}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label className="control-label">Area destino</label>
                <Select
                  placeholder="Area Destino"
                  value={this.state.datos.areanueva}
                  options={this.state.areas}
                  onChange={value =>
                    this.setState({
                      datos: Object.assign({}, this.state.datos, {
                        areanueva: value,
                      }),
                    })}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label className="control-label">
                  nuevo lider del area anterior
                </label>
                <Select
                  placeholder="Area Destino"
                  value={this.state.datos.nuevoLider}
                  options={this.state.empleados}
                  onChange={value =>
                    this.setState({
                      datos: Object.assign({}, this.state.datos, {
                        nuevoLider: value,
                      }),
                    })}
                />
              </div>
            </Col>
          </Row>
          <Button type="add" size="lg" onClick={this.changePerson.bind(this)} />
        </Panel>
        {/* <Panel title="Eliminiar Doctor">
          <Table hover={true} condense={true}>
            <TableHead blackMutedBackground={false}>
              <th>#</th>
              <th>Full Name</th>
              <th>Fecha Nacimiento</th>
              <th>Genero</th>
              <th>Especialidades</th>
              <th>AnosExperiencia</th>
              <th>Salario</th>
              <th>Lider</th>
              <th>TrabajaEn</th>
              <th>Accion</th>
            </TableHead>
            <TableBody>{this.renderTable()}</TableBody>
          </Table>
        </Panel> */}
      </Page>
    );
  }
}
