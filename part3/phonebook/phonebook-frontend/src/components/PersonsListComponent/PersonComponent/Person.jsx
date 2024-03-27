/* eslint react/prop-types: 0 */
import "./Persons.css";

const Person = ({ personName, personPhoneNumber, handleDeleteContact }) => {
  return (
    <>
      <div className="person">
        <div>
          <p>
            <strong>Name:</strong> {personName}
          </p>
          <p>
            <strong>Phone number:</strong> {personPhoneNumber}
          </p>
        </div>
        <button className="btn btn-delete" onClick={handleDeleteContact}>
          Delete person
        </button>
      </div>
    </>
  );
};

export default Person;
