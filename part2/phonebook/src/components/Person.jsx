/* eslint react/prop-types: 0 */
const Person = ({ personName, personPhoneNumber, handleDeleteContact }) => {
  return (
    <div>
      {personName}: {personPhoneNumber}
      <button onClick={handleDeleteContact}>delete contact</button>
    </div>
  );
};

export default Person;
