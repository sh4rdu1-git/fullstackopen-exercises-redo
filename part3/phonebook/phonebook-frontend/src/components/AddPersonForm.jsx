/* eslint react/prop-types: 0 */
const AddPersonForm = ({
  personName,
  personNameInputHandler,
  personPhoneNumber,
  personPhoneNumberInputHandler,
  addPersonToPhonebookHandler,
}) => {
  return (
    <form>
      {/* form to add new contact details */}
      <div>
        Name: <input value={personName} onChange={personNameInputHandler} />
      </div>
      <div>
        Phone number:{" "}
        <input
          value={personPhoneNumber}
          onChange={personPhoneNumberInputHandler}
        />
      </div>
      <div>
        <button type="submit" onClick={addPersonToPhonebookHandler}>
          Add person
        </button>
      </div>
    </form>
  );
};

export default AddPersonForm;
