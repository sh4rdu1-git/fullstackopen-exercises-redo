/* eslint react/prop-types: 0 */

import "./AddPersonForm.css";

const AddPersonForm = ({
  personName,
  personNameInputHandler,
  personPhoneNumber,
  personPhoneNumberInputHandler,
  addPersonToPhonebookHandler,
}) => {
  return (
    <>
      <div className="row">
        <div className="form-section">
          <form>
            {/* form to add new contact details */}
            {/* <div>
              <div>
                Name:{" "}
                <input value={personName} onChange={personNameInputHandler} />
              </div>
              <div>
                Phone number:{" "}
                <input
                  value={personPhoneNumber}
                  onChange={personPhoneNumberInputHandler}
                />
              </div>
            </div> */}
            <div className="form-inputs-layout">
              <div className="inputLabels">
                <p>Name</p>
                <p>Phone number</p>
              </div>
              <div className="inputBoxes column">
                <input value={personName} onChange={personNameInputHandler} />
                <input
                  value={personPhoneNumber}
                  onChange={personPhoneNumberInputHandler}
                />
              </div>
            </div>
            <div>
              <button
                className="btn btn-submit"
                type="submit"
                onClick={addPersonToPhonebookHandler}
              >
                Add person
              </button>
            </div>
          </form>
        </div>
        <div className="info-section">
          <p>
            Name should be <strong>at least 3 characters long</strong>
          </p>
          <p>
            Phone number should be <strong>in format XXX-XXXXXXXXXX</strong>
          </p>
        </div>
      </div>
    </>
  );
};

export default AddPersonForm;
