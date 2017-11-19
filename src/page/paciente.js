import React from 'react';
//TODO remover persona y agregar pesona en el back y del front
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './style.css';
import Config from './Config';

import moment from 'moment';
import { Row, Col } from 'react-flex-proto';

export class Paciente extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persona: {
        nombre: '',
        apellido: '',
        dob: moment(),
        sexo: '',
        plan: '',
      },
      respuesta: [],
    };
  }

  componentWillMount() {
    this.getPersonas();
  }

  getPersonas() {
    fetch(Config.api + '/pacientes')
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({ respuesta: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onEditableChange(key, value) {
    this.setState({ [key]: value });
  }

  onSetCurrentPage(value) {
    this.setState({ currentPage: value });
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to="/">Home</Link>
        Paciente
      </Breadcrumbs>
    );
  }

  onTextChange(key, event) {
    this.setState({
      persona: Object.assign({}, this.state.persona, {
        [key]: event.currentTarget.value,
      }),
    });
  }

  removePerson(id, indexArr) {
    fetch(Config.api + '/pacientes/delete', {
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
          var tmp = this.state.respuesta;
          tmp.splice(indexArr, 1);
          this.setState({ respuesta: tmp });
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
  isEmpty(str) {
    return !str || 0 === str.length;
  }
  addPerson() {
    if (
      !this.isEmpty(this.state.persona.apellido) &&
      !this.isEmpty(this.state.persona.nombre) &&
      !this.isEmpty(this.state.persona.plan) &&
      typeof this.state.persona.sexo === 'boolean'
    ) {
      fetch(Config.api + '/pacientes', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: this.state.persona.nombre,
          lname: this.state.persona.apellido,
          dob: this.state.persona.dob.format('YYYY-MM-DD'),
          gender: this.state.persona.sexo,
          plan: this.state.persona.plan,
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.res) {
            this.setState({
              persona: Object.assign(
                {},
                {
                  nombre: '',
                  apellido: '',
                  dob: moment(),
                  sexo: '',
                  plan: '',
                }
              ),
            });
            this.getPersonas();
            eventBus.addNotification(
              'success',
              'paciente ha sido agregado exitosamente'
            );
          } else {
            eventBus.addNotification(
              'error',
              'no se ha podido agregar paciente'
            );
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      eventBus.addNotification('error', 'no se ha podido agregar paciente');
    }
  }

  renderTable() {
    if (this.state.respuesta.length > 0) {
      return this.state.respuesta.map((val, index) => {
        return (
          <TableRow>
            <td>{val.pid}</td>
            <td>{val.fname + ' ' + val.lname}</td>
            <td>{val.dob.substring(0, 10)}</td>
            <td>{val.gender ? 'Hombre' : 'Mujer'}</td>
            <td>{val.planseguro}</td>
            <td>
              <Button
                type="danger"
                title="Eliminar"
                size="sm"
                onClick={this.removePerson.bind(this, val.pid, index)}
              />
            </td>
          </TableRow>
        );
      });
    }
  }
  // INSERT INTO PACIENTE (fname, lname, dob, gender,planSeguro) VALUES
  // ('bernardp','orozco','1996-06-01',true,'Unlimited');
  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title="Pacientes">
        <Panel title="Agregar paciente">
          <Row>
            <Col>
              <Input
                label="Nombre"
                placeholder="Ingresar nombre"
                onChange={e => this.onTextChange('nombre', e)}
                value={this.state.persona.nombre}
              />
            </Col>
            <Col>
              <Input
                label="Apellidos"
                placeholder="Ingresar apellidos"
                onChange={e => this.onTextChange('apellido', e)}
                value={this.state.persona.apellido}
              />
            </Col>
            <Col>
              <div className="form-group">
                <label className="control-label">Fecha de nacimiento</label>
                <div id="dia">
                  <DatePicker
                    showYearDropdown={true}
                    className="form-control"
                    selected={this.state.persona.dob}
                    onChange={date => {
                      this.setState({
                        persona: Object.assign({}, this.state.persona, {
                          dob: date,
                        }),
                      });
                    }}
                    dateFormat="YYYY-MM-DD"
                  />
                </div>
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label>Sexo</label>
                <Select
                  placeholder="Sexo"
                  value={this.state.persona.sexo}
                  options={[
                    { value: true, label: 'Hombre' },
                    { value: false, label: 'Mujer' },
                  ]}
                  onChange={value =>
                    this.setState({
                      persona: Object.assign({}, this.state.persona, {
                        sexo: value,
                      }),
                    })}
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label>Plan</label>
                <Select
                  placeholder="Plan"
                  value={this.state.persona.plan}
                  options={[
                    { value: 'Unlimited', label: 'Ilimitado' },
                    { value: 'Premium', label: 'Premium' },
                    { value: 'Basic', label: 'Basico' },
                  ]}
                  onChange={value =>
                    this.setState({
                      persona: Object.assign({}, this.state.persona, {
                        plan: value,
                      }),
                    })}
                />
              </div>
            </Col>
          </Row>
          <Button type="add" size="lg" onClick={this.addPerson.bind(this)} />
        </Panel>
        <Panel title="Eliminar pacientes">
          <Table hover={true} condense={true}>
            <TableHead blackMutedBackground={false}>
              <th>#</th>
              <th>Full Name</th>
              <th>Fecha Nacimiento</th>
              <th>Genero</th>
              <th>Plan</th>
              <th>Accion</th>
            </TableHead>
            <TableBody>{this.renderTable()}</TableBody>
          </Table>
        </Panel>
      </Page>
    );
  }
}
