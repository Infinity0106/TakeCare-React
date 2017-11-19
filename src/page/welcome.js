import React from 'react';
import { Page, Panel } from 'react-blur-admin';
import { Row, Col } from 'react-flex-proto';

export class Welcome extends React.Component {
  render() {
    return (
      <Page title={'TakeCare Sistema Hospitalario'}>
        <Row>
          <Col padding={5}>
            <Panel title="TakeCare hospital">
              <div>
                Este proyecto tiene como fin practicar la creacion de base de
                datos con modelos objeto relacionesl por esa razon utilizamos
                postrgresql conectandocolo con el frontend que utilizamos el
                freamework React de facebook y se comunican en el backend con
                una API creada en node.js
              </div>
            </Panel>
          </Col>
        </Row>

        <Row>
          <Col padding={5}>
            <Panel title="TODO">
              <div>
                <div className="blue-text">
                  <i className="fa fa-check-square-o" aria-hidden="true" /> A
                  doctor can be leader only of the Area he/she works on.
                </div>
                <div>
                  esto se resolvio por medio de una regla en el script de la
                  base de datos
                </div>
              </div>
              <br />
              <div>
                <div className="blue-text">
                  <i className="fa fa-check-square-o" aria-hidden="true" />
                  Every time a doctor accumulates two years of experience he/she
                  receive a salary increment of 10%
                </div>
                <div>
                  Lo logramos resolver por medio de un a funcion cronos que se
                  corre cada dia en la parte de la api
                </div>
              </div>
              <br />
              <div>
                <div className="blue-text">
                  <i className="fa fa-check-square-o" aria-hidden="true" />
                  Possible values of insurance plan are: Unlimited, Premium, or
                  Basic
                </div>
                <div>
                  utilizimaos un tipo de dato enum en la base de datos para solo
                  aceptar este dipo de valores ademas que no le damos permiso al
                  usuario ingresar texto en este tipo de campos
                </div>
              </div>
              <br />
              <div>
                <div className="blue-text">
                  <i className="fa fa-check-square-o" aria-hidden="true" />
                  It is possible that a doctor changes his/her Area with in the
                  hospital. If the doctor was the leader of the original area,
                  then such an area must select a new leader.
                </div>
                <div>
                  esto se resolvio solo mostrando a los jefes de departamento en
                  el front-end y que solo ellos se puedan modificicar y despues
                  seleccionar a las personas que no son lideres pero trabajan en
                  la area anterior de que cambiara asi no dejar el lider como
                  null
                </div>
              </div>
              <br />
              <div>
                <div className="blue-text">
                  <i className="fa fa-check-square-o" aria-hidden="true" />{' '}
                  Medical Specialties for doctors and Hospital Areas share the
                  same names and these are limited to the following: General
                  Medicine, Traumatology, Allergology, Radiology, Cardiology,
                  Gerontology, Obstetrics and Pediatrics.
                </div>
                <div>
                  el area se trato como una tabla de catalogo y del tipo d edato
                  enum para que solo existan esos podibles valores y que el
                  docotro contenga llaves foraneas de esta talba
                </div>
              </div>
              <br />
              <div>
                <div className="blue-text">
                  <i className="fa fa-check-square-o" aria-hidden="true" />
                  A doctor may be associated only to hospital areas that are
                  part of his-her specialties.
                </div>
                <div>
                  creamos una regla en la base de datos que revise si su area de
                  trabajo esta dentro de sus especialiddes si no lo esta no lo
                  ingresa a la base de datos
                </div>
              </div>
              <br />
              <div>
                <div className="blue-text">
                  <i className="fa fa-check-square-o" aria-hidden="true" />
                  Unlimited insurance plan allow patients to be treated by
                  doctors in any area of the hospital.
                </div>
                <div>
                  No se creo nada para esta condicion ya que tiene acceso a
                  todos los tipod de doctores
                </div>
              </div>
              <br />
              <div>
                <div className="blue-text">
                  <i className="fa fa-check-square-o" aria-hidden="true" />
                  Premium insurance allows patients to receive treatments for
                  all areas except Radiology.
                </div>
                <div>
                  se creo una regla donde si tienen plan premiun y es doctoro
                  radiolgo no lo puede ignresar a la base de datos
                </div>
              </div>
              <br />
              <div>
                <div className="blue-text">
                  <i className="fa fa-check-square-o" aria-hidden="true" />
                  Basic Insurance covers only General Medicine, Obstetrics and
                  Pediatrics
                </div>
                <div>
                  se creo una regla en la base de datos para que solo acepter
                  estos tres tipos de doctores en la insecion a tratamientos
                </div>
              </div>
            </Panel>
          </Col>
        </Row>

        <h2>Integreantes del equipo</h2>
        <Row>
          <Col padding={5}>
            <Panel title="Bernardo Orozco">creador de DDL</Panel>
          </Col>
          <Col padding={5}>
            <Panel title="hector">
              en apoyo con sergio ayudo a crear la API
            </Panel>
          </Col>
          <Col padding={5}>
            <Panel title="Ruben">Creador del front end</Panel>
          </Col>
          <Col padding={5}>
            <Panel title="Sergio">
              encargado de publicar los sitemas en linea
            </Panel>
          </Col>
        </Row>
      </Page>
    );
  }
}
