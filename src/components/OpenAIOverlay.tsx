import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Offcanvas from "react-bootstrap/Offcanvas";
import OpenAI from "openai";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OpenAIOverlayProps {
  basicQuestionSet: boolean;
  currentQuestion: string;
  openAIKey: string;
}

export function OpenAIOverlay({
  basicQuestionSet,
  currentQuestion,
  openAIKey,
}: OpenAIOverlayProps): JSX.Element {
  const openai = new OpenAI({
    apiKey: openAIKey,
    dangerouslyAllowBrowser: true,
  });

  const [userMessage, setUserMessage] = useState<Message[]>(
    returnBaseMessage(basicQuestionSet),
  );

  const [show, setShow] = useState(false);

  const [responses, setResponses] = useState<string[]>([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Set initial, Base Message
  function returnBaseMessage(qSetType: boolean): Message[] {
    if (qSetType) {
      return [
        {
          role: "system",
          content: `You are on a Career Survey site (called FindMyCareer, for University of Delaware students -- especifically on the basic questions page) that contains a form that aims to provide users with feedback concerning their potential careers based on their input to questions, with answers augmented by you, an LLM. You will be receiving answers to the questions below and it is your responsability to analyze the answers provided, as they are provided (one-by-one), and began ideating potential careers based on their answers (essentially, brainstorm as they answer). After the final question, you will generate 2-3 sentences with your conclusive verdict. The user may go back and reanswer the question, keep this in mind. Be personable, though not too verbose. Try as best as you can to provide an insightful answer. Your aim should be to provide the most accurate responses based given the input
            Here are the questions, in the order:
            1. What do you like to do in your free time?
            2. Which of these statements best describes you?
            3. What is the highest level of education completed?
            4. I find myself frequently setting priorities and creating schedules to effectively manage my time and tasks, ensuring that important deadlines are met.
            5. What is your favorite subject when you at school?
            6. How do you handle challenges?
            7. Which aspect of a project excites you the most?
            8. What motivates you to work hard?

            RESPOND WITH "Excited to take a look at your responses!" IF YOU UNDERSTAND
...
            ONCE YOU HAVE COLLECTED ALL SEVEN RESPONSES, PROVIDE AN OUTPUT THAT IS AN ARRAY OF THE FOLLOWING OBJECT TYPE:

            interface Card {
                title: string
                info: string
                image: string
            }

            THE OUTPUT WILL BE COMPOSED OF AN ARRAY OF CARD WITH 3 POSSIBLE CAREER OPTIONS, THE CAREER NAME IN TITLE, A SHORT DESCRIPTION OF WHY YOU THINK IT'S A GOOD FIT FOR THIS PERSON IN THE INFO FIELD, AND THE IMAGE FIELD SHOULD BE AN EMPTY STRING.

            HERE IS AN EXAMPLE OF THE EXPECTED FINAL OUTPUT:

            [{title: 'Career', info: 'a', image: 'https://picsum.photos/id/237/536/354'}, {title: 'Career2', info: 'a', image: 'https://picsum.photos/id/237/536/354'}, {title: 'Career3', info: 'a', image: 'https://picsum.photos/id/237/536/354'}]
            `,
        },
      ];
    } else {
      return [
        {
          role: "system",
          content: `You are on a Career Survey site (called FindMyCareer, for University of Delaware students -- especifically on the detailed questions page) that contains a form that aims to provide users with feedback concerning their potential careers based on their input to questions, with answers augmented by you, an LLM. You will be receiving answers to the questions below and it is your responsability to analyze the answers provided, as they are provided (one-by-one), and began ideating potential careers based on their answers (essentially, brainstorm as they answer). After the final question, you will generate 2-3 sentences with your conclusive verdict. The user may go back and reanswer the question, keep this in mind. Be personable, though not too verbose. Try as best as you can to provide an insightful answer. Your aim should be to provide the most accurate responses based given the input
            Here are the questions, in the order:
            1. What is most important to you in a job (Multi-Choice/Free-response)
            2. What is your ideal working schedule? (Free-response)
            3. What kind of work environments would you thrive in the most? (Free-response)
            4. What skills do you possess and enjoy using? (Free-response)
            5. Do you prefer working independently or as part of a team? (Free-response)
            6. Are you comfortable working in a fast-paced, high-stress environment or do you prefer a slower pace? (Free-Response)
            7. How do you feel about traveling for work? (Free-Response)

            RESPOND WITH "Excited to take a look at your responses!" IF YOU UNDERSTAND
...
            ONCE YOU HAVE COLLECTED ALL SEVEN RESPONSES, PROVIDE AN OUTPUT THAT IS AN ARRAY OF THE FOLLOWING OBJECT TYPE:

            interface Card {
                title: string
                info: string
                image: string
            }

            THE OUTPUT WILL BE COMPOSED OF AN ARRAY OF CARD WITH 5 POSSIBLE CAREER OPTIONS, THE CAREER NAME IN TITLE, A SHORT DESCRIPTION OF WHY YOU THINK IT'S A GOOD FIT FOR THIS PERSON IN THE INFO FIELD, AND THE IMAGE FIELD SHOULD BE AN EMPTY STRING.

            HERE IS AN EXAMPLE OF THE EXPECTED FINAL OUTPUT:

            [{title: 'Career', info: 'a', image: 'https://picsum.photos/id/237/536/354'}, {title: 'Career2', info: 'a', image: 'https://picsum.photos/id/237/536/354'}, {title: 'Career3', info: 'a', image: 'https://picsum.photos/id/237/536/354'}]
            `,
        },
      ];
    }
  }

  //Branch: Submit Prompt for either SQ or DQ, return text result
  async function agent(userInput: string) {
    setUserMessage((prevMessages) => [
      ...prevMessages,
      {
        role: "user",
        content: userInput,
      },
    ]);
  }

  useEffect(() => {
    if (
      currentQuestion !== userMessage[userMessage.length - 1].content &&
      currentQuestion
    ) {
      async function processLatest(): Promise<string> {
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: userMessage,
        });
        const content = response.choices[0].message.content;
        if (content === null) {
          throw new Error("Message content is null");
        }
        return content;
      }
      console.log("in here");

      async function exec() {
        await agent(currentQuestion);
        const gptRetVal = await processLatest();
        setResponses((prevResponses) => [...prevResponses, gptRetVal]);
      }
      exec();
      console.log(userMessage);
    }
  }, [currentQuestion]); // eslint-disable-line react-hooks/exhaustive-deps

  // run through initialization
  // show overlay with report result

  return (
    <>
      <div className="d-block mt-3">
        <Button variant="secondary" onClick={handleShow}>
          AI Feedback
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Live Insight</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {responses.map((response, index) => (
            <Alert key={index} variant="info" className="mb-2">
              {response}
            </Alert>
          ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
