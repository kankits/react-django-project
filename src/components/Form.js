import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./YogaForm.css";

const client = "http://127.0.0.1:8000/api/enroll/";

const YogaForm = () => {
  useEffect(() => {
    document.title = "Enrollment Form";
  });
  const [participant, setParticipant] = useState({
    name: "",
    email: "",
    age: "",
    chosen_batch: "",
  });

  //active state for age and email
  const [is_valid_email, set_valid_email] = useState(true);
  const [is_valid_age, set_valid_age] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (
      !participant.name ||
      !participant.email ||
      !participant.age ||
      !participant.chosen_batch
    ) {
      alert("Please fill all the details!");
      return;
    }

    try {
      // Send POST request to Django backend
      const response = await axios.post(client, participant);
      const Payment = CompletePayment(response);
      if (Payment) {
        alert("Payment Successful!! You are enrolled.");
      } else {
        alert("Payment processing failed. Please try again.");
      }
    } catch (error) {
      alert("Some fields are already present! Please change and try again");
    }
  };

  //Email Validation
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setParticipant((prevParticipant) => ({
      ...prevParticipant,
      email: newEmail,
    }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    set_valid_email(emailRegex.test(newEmail));
  };

  // Age validation
  const handleAgeChange = (e) => {
    const newAge = e.target.value;
    setParticipant((prevParticipant) => ({
      ...prevParticipant,
      age: newAge,
    }));

    const parsedAge = parseInt(newAge, 10);
    set_valid_age(18 <= parsedAge && parsedAge <= 65);
  };

  const CompletePayment = (userData) => {
    return { success: true }; // Mock function for enrollment
  };

  return (
    <div className="container mt-5">
      <h2 className="form-title">Yoga Classes Admission Form</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName" className="form-group">
          <Form.Label>Name : </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={participant.name}
            onChange={(e) =>
              setParticipant({ ...participant, name: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="form-group">
          <Form.Label>Email : </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            value={participant.email}
            onChange={handleEmailChange}
          />
        </Form.Group>
        {!is_valid_email && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Please enter a valid email address.
          </p>
        )}

        <Form.Group controlId="formAge" className="form-group">
          <Form.Label>Age : </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            value={participant.age}
            onChange={handleAgeChange}
          />
        </Form.Group>
        {!is_valid_age && (
          <p style={{ color: "red", fontSize: "12px" }}>
            Please enter age between 18 and 65.
          </p>
        )}

        <Form.Group controlId="formBatch" className="form-group">
          <Form.Label>Select Batch : </Form.Label>
          <Form.Control
            as="select"
            value={participant.chosen_batch}
            onChange={(e) =>
              setParticipant({ ...participant, chosen_batch: e.target.value })
            }
          >
            <option value="">Select Batch</option>
            <option value="6-7AM">6-7AM</option>
            <option value="7-8AM">7-8AM</option>
            <option value="8-9AM">8-9AM</option>
            <option value="5-6PM">5-6PM</option>
          </Form.Control>
        </Form.Group>

        <label>The monthly fee is 500/- Rs INR.</label>

        <Button variant="primary" type="submit" className="submit-btn">
          Make Payment to enroll
        </Button>
      </Form>
    </div>
  );
};

export default YogaForm;
