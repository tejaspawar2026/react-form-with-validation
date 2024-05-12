import React, { useState } from 'react';
import "../App.css";

function Form() {
  const [name, setName] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [document, setDocument] = useState("");
  const [documentErr, setDocumentErr] = useState(false);
  const [tnc, setTnc] = useState(false);
  const [tncErr, setTncErr] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function getFormData(e) {
    e.preventDefault();

    // Resetting previous errors
    setNameErr(false);
    setDocumentErr(false);
    setTncErr(false);

    let isValid = true;

    // Name validation
    if (name.trim().length < 3) {
      setNameErr(true);
      isValid = false;
    }

    // Document validation
    if (!document) {
      setDocumentErr(true);
      isValid = false;
    }

    // Terms & Conditions validation
    if (!tnc) {
      setTncErr(true);
      isValid = false;
    }

    if (isValid) {
      const formData = {
        name: name,
        document: document,
        tnc: tnc
      };
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
      console.log(JSON.stringify(formData));
    }
  }

  function nameHandler(e) {
    setName(e.target.value);
  }

  function documentHandler(e) {
    setDocument(e.target.value);
  }

  return (
    <div>
      {isSubmitted && (
        <div style={{ backgroundColor: "#dff0d8", padding: "10px", borderRadius: "5px", marginBottom: "10px" }}>
          Form submitted successfully!
        </div>
      )}
      <form onSubmit={getFormData}>
        <div className="form-container">
          <label className="input-label" htmlFor="name">
            Name:
          </label>
          <input type="text" id="name" placeholder="Enter your name" value={name} onChange={nameHandler} />
          {nameErr && <span className="validationErr">Enter a valid name (at least 3 characters)</span>}
          
          <label className="input-label" htmlFor="document">
            Document:
          </label>
          <select name="document" id="document" value={document} onChange={documentHandler}>
            <option value="">-- Select Document --</option>
            <option value="aadhar">Aadhar</option>
            <option value="bankpassbook">Bank Passbook</option>
            <option value="drivinglicense">Driving License</option>
            <option value="pan">Pan</option>
            <option value="passport">Passport</option>
          </select>
          {documentErr && <span className="validationErr">Select a valid document</span>}
          
          <label className="input-label" htmlFor="tnc">
            Terms & Conditions
          </label>
          <div className="radio-container">
            <label htmlFor="checkinp1">Yes</label>
            <input type="radio" id="checkinp1" name="tnc" checked={tnc} onChange={() => setTnc(true)} />
            <label htmlFor="checkinp2">No</label>
            <input type="radio" id="checkinp2" name="tnc" checked={!tnc} onChange={() => setTnc(false)} />
          </div>
          {tncErr && <span className="validationErr">You must agree to the terms & conditions</span>}
          
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Form;
