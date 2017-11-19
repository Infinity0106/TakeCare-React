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
  eventBus,
  Select as BuildSelect,
} from 'react-blur-admin';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import './style.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { Link } from 'react-router';
import Config from './config';

import { Row, Col } from 'react-flex-proto';

export class Doctor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persona: {
        nombre: '',
        apellido: '',
        dob: moment(),
        anoExp: moment(),
        sexo: '',
        lider: '',
        trabajaEn: '',
        salario: 0,
        especialidades: [],
      },
      respuesta: [],
      options: [
        { value: null, label: ' ' },
        { value: 'General Medicine', label: 'Medicina general' },
        { value: 'Traumatology', label: 'Traumatologia' },
        { value: 'Allergology', label: 'Alergologia' },
        { value: 'Radiology', label: 'Radiologia' },
        { value: 'Cardiology', label: 'Cardiologia' },
        { value: 'Gerontology', label: 'Gerontologia' },
        { value: 'Obstetrics', label: 'Obstetricia' },
        { value: 'Pediatrics', label: 'Pediatria' },
      ],
    };
  }

  componentWillMount() {
    this.getPersonas();
    console.log(this.state.respuesta);
  }

  renderBreadcrumbs() {
    return (
      <Breadcrumbs>
        <Link to="/">Home</Link>
        Doctores
      </Breadcrumbs>
    );
  }

  logChange(val) {
    this.setState({
      persona: Object.assign({}, this.state.persona, {
        especialidades: val,
      }),
    });
  }

  renderFormDoc() {
    return (
      <div>
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
          </Col>
          <Col>
            <div className="form-group">
              <label>Sexo</label>
              <BuildSelect
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
        </Row>
        <Row>
          <Col>
            <div className="form-group">
              <label>Especialidades</label>
              <Select
                closeOnSelect={false}
                name="form-field-name"
                value={
                  this.state.persona.especialidades == null
                    ? ''
                    : this.state.persona.especialidades
                }
                options={this.state.options}
                onChange={this.logChange.bind(this)}
                placeholder="Select your favourite(s)"
                multi={true}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label className="control-label">Anos de ingreso</label>
              <DatePicker
                showYearDropdown={true}
                className="form-control"
                selected={this.state.persona.anoExp}
                onChange={date => {
                  this.setState({
                    persona: Object.assign({}, this.state.persona, {
                      anoExp: date,
                    }),
                  });
                }}
                dateFormat="YYYY-MM-DD"
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label>Lider</label>
              <BuildSelect
                placeholder="Lider de ..."
                value={
                  this.state.persona.lider == null
                    ? ''
                    : this.state.persona.lider
                }
                options={this.state.options}
                onChange={value =>
                  this.setState({
                    persona: Object.assign({}, this.state.persona, {
                      lider: value,
                    }),
                  })}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label>Trabaja en</label>
              <BuildSelect
                placeholder="Trabaja en ..."
                value={
                  this.state.persona.trabajaEn == null
                    ? ''
                    : this.state.persona.trabajaEn
                }
                options={this.state.options}
                onChange={value =>
                  this.setState({
                    persona: Object.assign({}, this.state.persona, {
                      trabajaEn: value,
                    }),
                  })}
              />
            </div>
          </Col>
          <Col>
            <Input
              label="Salairo"
              placeholder="Ingresar solo numeros"
              onChange={e => this.onTextChange('salario', e)}
              value={this.state.persona.salario}
            />
          </Col>
        </Row>
      </div>
    );
  }

  onTextChange(key, event) {
    this.setState({
      persona: Object.assign({}, this.state.persona, {
        [key]: event.currentTarget.value,
      }),
    });
  }

  getPersonas() {
    fetch(Config.api + '/doctores')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ respuesta: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  isEmpty(str) {
    return !str || 0 === str.length;
  }

  addPerson() {
    console.log(this.state.persona);
    if (
      !this.isEmpty(this.state.persona.nombre) &&
      !this.isEmpty(this.state.persona.apellido) &&
      this.state.persona.trabajaEn != null &&
      !this.isEmpty(this.state.persona.trabajaEn) &&
      this.state.persona.salario != 0 &&
      typeof this.state.persona.sexo == 'boolean' &&
      !isNaN(this.state.persona.salario) &&
      this.state.persona.especialidades.length > 0
    ) {
      var spec = [];
      this.state.persona.especialidades.forEach(val => {
        spec.push(val.value);
      });
      console.log(spec);
      fetch(Config.api + '/doctores', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: this.state.persona.nombre,
          apellido: this.state.persona.apellido,
          fecha: this.state.persona.dob.format('YYYY-MM-DD'),
          sexo: this.state.persona.sexo,
          especialidades: spec,
          anosExp: this.state.persona.anoExp.format('YYYY-MM-DD'),
          lider: this.isEmpty(this.state.persona.lider)
            ? null
            : this.state.persona.lider,
          trabaja: this.state.persona.trabajaEn,
          salario: parseInt(this.state.persona.salario),
        }),
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.res) {
            this.getPersonas();
            this.setState({
              persona: Object.assign(
                {},
                {
                  nombre: '',
                  apellido: '',
                  dob: moment(),
                  anoExp: moment(),
                  sexo: '',
                  lider: null,
                  trabajaEn: '',
                  salario: 0,
                  especialidades: [],
                }
              ),
            });
            eventBus.addNotification(
              'success',
              'doctor ha sido agregado exitosamente'
            );
          } else {
            eventBus.addNotification('error', 'no se ha podido agregar doctor');
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      eventBus.addNotification('error', 'no se ha podido agregar doctor');
    }
    console.log('hola');
  }

  removePerson(id, indexArr) {
    fetch(Config.api + '/doctores/delete', {
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
            'doctor ha sido eliminado exitosamente'
          );
        } else {
          eventBus.addNotification('error', 'no se ha podido eliminar doctor');
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  renderTable() {
    if (this.state.respuesta.length > 0) {
      return this.state.respuesta.map((val, index) => {
        var lider, trabaja;
        this.state.options.forEach(ele => {
          if (ele.value == val.trabajaen) trabaja = ele.label;
          if (ele.value == val.lider) lider = ele.label;
        });
        console.log(lider, trabaja);
        var espe = val.especialidades.substr(1, val.especialidades.length - 2);
        espe = espe.replace(/"/g, '');
        espe = espe.replace(/,/g, ', ');
        return (
          <TableRow>
            <td>{val.pid}</td>
            <td>{val.fname + ' ' + val.lname}</td>
            <td>{val.dob.substring(0, 10)}</td>
            <td>{val.gender ? 'Hombre' : 'Mujer'}</td>
            <td>{espe}</td>
            <td>{val.anosexp.substring(0, 10)}</td>
            <td>{val.salario}</td>
            <td>{lider}</td>
            <td>{trabaja}</td>
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
  render() {
    return (
      <Page actionBar={this.renderBreadcrumbs()} title="Doctores">
        <Panel title="Agregar Doctor">
          {this.renderFormDoc()}
          <Button type="add" size="lg" onClick={this.addPerson.bind(this)} />
        </Panel>
        <Panel title="Eliminiar Doctor">
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
        </Panel>
      </Page>
    );
  }
}
