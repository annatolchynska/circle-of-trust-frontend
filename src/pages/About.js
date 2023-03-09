import React from "react";
import Container from "react-bootstrap/Container";
import styles from "../styles/About.module.css";



function About() {
    return (
        <Container className={styles.Content}>
            <h2>
                <strong>About this site:</strong>
            </h2>
            <hr />
            <p>
                Need a list, need to write a memo to your close ones but tired of whatsapp group chats?
                This is a family/friends app that can do all that in one place !.
            </p>
            <p>
                You can like and comment on each others memos, you can visit
                each others profile, to tell them "I'm watching you!", you can have your todo list
                all in one handy place.
            </p>
            <p>
                You can edit and delete your own comments, memos, and todo list
                everything is easy.
                Why not to have a look around and then sign up for your own account, which is also editable
            </p>
            <p>
                You're priviledged to be inside the Circle of trust!
            </p>
            <br />
            
        </Container>
    )
}

export default About;