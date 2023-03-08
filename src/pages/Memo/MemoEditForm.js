import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import styles from "../../styles/CreateMemoForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { Alert } from "react-bootstrap";

function MemoEditForm() {

  const [errors, setErrors] = useState({});

  const [memoData, setMemoData] = useState({
    attention_of: "",
    content: "",
  });
  const { attention_of, content } = memoData;

  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/memo_posts/${id}/`);
        const { attention_of, content, is_owner } = data;

        is_owner ? setMemoData({ attention_of, content }) : history.push('/');
      } catch (err) {
       // console.log(err);
      }
    };

    handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setMemoData({
      ...memoData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();

    formData.append('attention_of', attention_of);
    formData.append('content', content);

    try {
      await axiosReq.put(`/memo_posts/${id}/`, formData);
      history.push(`/memo_posts/${id}`)
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data)
      }
    }
  }

  return (
    <Container className={styles.Container}>
      <br />
      <h2>Edit memo</h2>
      <br />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Attention of:</Form.Label>
          <Form.Control
            type="text"
            name="attention_of"
            value={attention_of}
            onChange={handleChange}
            aria-label="attention of"
          />
        </Form.Group>
        {errors?.attention_of?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Content:</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="content"
            value={content}
            onChange={handleChange}
            aria-label="content"
          />
        </Form.Group>
        {errors?.content?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <br />
        <div className="text-center">
          <Button
            className={btnStyles.Button}
            onClick={() => history.goBack()}
          >
            cancel
          </Button>
          <Button className={btnStyles.Button} type="submit">
            create
          </Button>
        </div>

      </Form>
    </Container>
  );
}

export default MemoEditForm;