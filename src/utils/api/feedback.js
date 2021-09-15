import axios from 'axios';

/**
 * Submit feedback
 *
 * @param {Object} body Message, email and type
 */
const submitFeedback = async (body) => {
    await axios.post(
        `${process.env.REACT_APP_API_URL}/db/feedback`,
        body,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            timeout: process.env.REACT_APP_HTTP_TIMEOUT,
        },
    );
};

export default submitFeedback;
