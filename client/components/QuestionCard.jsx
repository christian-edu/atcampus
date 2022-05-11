const QuestionCard = ({
  subject,
  person,
  posted,
  question,
  answerAmount,
  likes,
  answers,
}) => {
  const [showAnswer, setShowAnswers] = useState(false);

  function showAnswerFn() {
    if (showAnswer) {
      setShowAnswers(false);
    } else {
      setShowAnswers(true);
    }
  }

  return (
    <div>
      <h5>{subject}</h5>
      <h4>{person}</h4>
      <p>{posted}</p>
      <p>{question}</p>
      <h4
        onClick={showAnswerFn}
        style={{ display: 'inline-block', marginRight: 20 }}
      >
        {answerAmount} Svar
      </h4>
      <h4 style={{ display: 'inline-block' }}>{likes} Hearths</h4>

      {showAnswer ? (
        <div>
          {answers.map((specificAnswer) => (
            <div key={specificAnswer.answer}>
              <h4>{specificAnswer.answer} </h4>
              <p>({specificAnswer.votes}) votes</p>
            </div>
          ))}
        </div>
      ) : (
        <h2></h2>
      )}
    </div>
  );
};

export default QuestionCard;
