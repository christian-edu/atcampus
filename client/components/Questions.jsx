import { useLoader } from '../useLoader';
import QuestionCard from './QuestionCard';
import { fetchJSON } from '../fetchJSON';
import { useState } from 'react';

const Questions = () => {
  const { data, error, loading } = useLoader(() => fetchJSON('/api/questions'));

  const [chosenSubject, setChosenSubject] = useState([]);

  const subjects = [];

  if (loading) {
    return <h2>Loading questions..</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>Error</h2>
        {error}
      </div>
    );
  }

  // gets the subject list from the backend data
  // For more easy displaying of the subject names in the dropdown menu
  data.map((subject) => {
    subjects.push(subject.subject);
  });

  return (
    <div>
      <div>
        <h2>Emner</h2>

        <select
          name='subject'
          onChange={(e) =>
            setChosenSubject((oldArray) => [...oldArray, e.target.value])
          }
        >
          {subjects.map((su) => (
            <option key={su} value={su}>
              {su}
            </option>
          ))}
        </select>
      </div>

      {data.map((subject) => (
        /*Choose to show the chosen subject*/

        <div>
          {subject.questions.map((question) => (
            <div>
              <QuestionCard
                subject={subject.subject}
                person={question.student}
                posted={question.timeposted}
                question={question.question}
                answerAmount={question.answers.length}
                likes={question.likes}
                answers={question.answers}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Questions;
