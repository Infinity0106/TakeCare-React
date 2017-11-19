import React from 'react';

import {
  Page,
  Panel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Button,
  EditableText,
  Pagination,
  Breadcrumbs,
  Input,
  Select,
  eventBus,
} from 'react-blur-admin';
import { Link } from 'react-router';

import { Row, Col } from 'react-flex-proto';
import Config from './config';

export class Tratamiento extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tratamientos: [],
      pacientes: [],
      doctores: [],
      tratamiento: {
        duracion: '',
        medicamentos: '',
        descripcion: '',
        paciente: NaN,
        doctor: NaN,
      },
    };
  }

  componentWillMount() {
    this.getTratamientos();
    this.getPersonas();
    this.getDoctores();
  }

  getTratamientos() {
    fetch(Config.api + '/tratamientos')
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ tratamientos: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getPersonas() {
    fetch(Config.api + '/pacientes')
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        var tmpArray = [];
        responseJson.forEach(element => {
          tmpArray.push({
            value: element.pid,
            label:
              element.fname + ' ' + element.lname + ' ' + element.planseguro,
          });
        });
        this.setState({ pacientes: tmpArray });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getDoctores() {
    fetch(Config.api + '/doctores')
      .then(response => response.json())
      .then(responseJson => {
        var tmpArr = [];
        responseJson.forEach(element => {
          tmpArr.push({
            value: element.pid,
            label: element.fname + ' ' + element.lname + ' ' + element.trabajaen,
          });
        });
        this.setState({ doctores: tmpArr });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to="/">Home</Link>
        Tratamiento
      </Breadcrumbs>
    );
  }

  onTextChange(key, event) {
    this.setState({
      tratamiento: Object.assign({}, this.state.tratamiento, {
        [key]: event.currentTarget.value,
      }),
    });
  }

  isEmpty(str) {
    return !str || 0 === str.length;
  }

  addTrat() {
    if (
      !this.isEmpty(this.state.tratamiento.descripcion) &&
      !this.isEmpty(this.state.tratamiento.duracion) &&
      !this.isEmpty(this.state.tratamiento.medicamentos) &&
      !isNaN(this.state.tratamiento.doctor) &&
      !isNaN(this.state.tratamiento.paciente)
    ) {
      fetch(Config.api + '/tratamientos', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          duracion: this.state.tratamiento.duracion,
          medicamentos: this.state.tratamiento.medicamentos,
          descripcion: this.state.tratamiento.descripcion,
          paciente: this.state.tratamiento.paciente,
          doctor: this.state.tratamiento.doctor,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.res) {
            this.setState({
              tratamiento: Object.assign(
                {},
                {
                  duracion: '',
                  medicamentos: '',
                  descripcion: '',
                  paciente: NaN,
                  doctor: NaN,
                }
              ),
            });
            this.getTratamientos();
            eventBus.addNotification(
              'success',
              'tratamiendo ha sido agregado exitosamente'
            );
          } else {
            eventBus.addNotification(
              'error',
              'no se ha podido agregar tratamiento'
            );
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      eventBus.addNotification('error', 'no se ha podido agregar tratamiento');
    }
  }

  removeTratamiento(id, index) {
    fetch(Config.api + '/tratamientos/delete', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.res) {
          var tmp = this.state.tratamientos;
          tmp.splice(indexArr, 1);
          this.setState({ tratamientos: tmp });
          eventBus.addNotification(
            'success',
            'paciente ha sido eliminado exitosamente'
          );
        } else {
          eventBus.addNotification(
            'error',
            'no se ha podido eliminar paciente'
          );
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  renderTable() {
    if (this.state.tratamientos.length > 0) {
      return this.state.tratamientos.map((e, index) => {
        return (
          <TableRow>
            <td>{e.idtrata}</td>
            <td>{e.duracion}</td>
            <td>{e.medicamentos}</td>
            <td>{e.descripcion}</td>
            <td>{e.paciente}</td>
            <td>{e.doctor}</td>
            <td>
              <Button
                type="danger"
                title="Eliminar"
                size="sm"
                onClick={this.removeTratamiento.bind(this, e.idtrata, index)}
              />
            </td>
          </TableRow>
        );
      });
    }
  }

  // duracion, medicamentos, descripcion, paciente, doctor
  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title="TRATAMIENTO">
        <Panel title="Agregar Tratamiento">
          <Row>
            <Col>
              <Input
                label="Duraccion"
                placeholder="Ingresar duracion del tratamiento"
                onChange={e => this.onTextChange('duracion', e)}
                value={this.state.tratamiento.duracion}
              />
            </Col>
            <Col>
              <Input
                label="Medicamentos"
                placeholder="Ingresar los medicamentos"
                onChange={e => this.onTextChange('medicamentos', e)}
                value={this.state.tratamiento.medicamentos}
              />
            </Col>
            <Col>
              <Input
                label="Descripcion"
                placeholder="Descripcion (modo de uso)"
                onChange={e => this.onTextChange('descripcion', e)}
                value={this.state.tratamiento.descripcion}
              />
            </Col>
            <Col>
              <div className="form-group">
                <label className="control-label">Paciente</label>
                <Select
                  placeholder="Paciente"
                  value={this.state.tratamiento.paciente}
                  options={this.state.pacientes}
                  onChange={value =>
                    this.setState({
                      tratamiento: Object.assign({}, this.state.tratamiento, {
                        paciente: value,
                      }),
                    })}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label className="control-label">Doctor</label>
                <Select
                  placeholder="Doctor"
                  value={this.state.tratamiento.doctor}
                  options={this.state.doctores}
                  onChange={value =>
                    this.setState({
                      tratamiento: Object.assign({}, this.state.tratamiento, {
                        doctor: value,
                      }),
                    })}
                />
              </div>
            </Col>
          </Row>
          <Button type="add" size="lg" onClick={this.addTrat.bind(this)} />
        </Panel>
        <Panel title="Eliminar pacientes">
          <Table hover={true} condense={true}>
            <TableHead blackMutedBackground={false}>
              <th>#</th>
              <th>Duracion</th>
              <th>Medicamentos</th>
              <th>Descripcion</th>
              <th>Paciente</th>
              <th>Doctor</th>
              <th>Accion</th>
            </TableHead>
            <TableBody>{this.renderTable()}</TableBody>
          </Table>
        </Panel>
      </Page>
    );
  }
}
