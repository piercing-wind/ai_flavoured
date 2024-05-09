import React from 'react';
import DOMPurify from 'dompurify';

const formatMessage = (message) => {
  // Sanitize the input
  const sanitizedMessage = DOMPurify.sanitize(message);

  // Remove example questions from the message
  const messageWithoutQuestions = sanitizedMessage.replace(/\n*Example Questions:\n\d+\.\s*.+/g, '');

  // Replace line breaks with <br> tags
  const formattedMessage = messageWithoutQuestions.replace(/\n/g, '<br>');

  return { __html: formattedMessage };
};

const extractQuestions = (message) => {
  const questionRegex = /\d+\.\s*(.+?)(?=\n\d+\.|$)/g;
  const questions = [];
  let match;

  while ((match = questionRegex.exec(message)) !== null) {
    questions.push(match[1].trim());
  }

  return questions;
};

const handleQuestionClick = (e, question) => {
  e.preventDefault();
  // Handle question click event (e.g., copy to clipboard, trigger search, etc.)
  console.log('Clicked question:', question);
};

const ChatComponent = ({ messages, user, isLightMode }) => {
  const cn = (...classes) => classes.filter(Boolean).join(' ');

  return (
    <div className="w-full flex flex-col h-full">
      <div className="flex flex-col space-y-2 overflow-y-auto h-\[calc(100vh-5rem)\]">
        {messages.map((chat, index) => (
          chat.role === 'human' ? (
            <div className="flex w-full justify-end" key={index}>
              <div
                className={cn(
                  `ml-14 self-end light:bg-pink-200 p-2 rounded-md border border-gray-500`,
                  isLightMode ? ' bg-slate-300' : ' bg-zinc-900'
                )}
              >
                {chat.message}
              </div>
              <div className="flex items-center mx-2" title={user?.name}>
                <UserIcon userImage={user?.image} />
              </div>
            </div>
          ) : (
            <div className="flex w-full" key={index}>
              <div className="w-8 mx-2" title="AI Flavoured">
                <LogoText />
              </div>
              <div className=" mr-14 self-start backdrop-blur-lg border border-gray-700 p-2 rounded-md">
                {chat.title && <div className="text-lg font-bold">{chat.title}</div>}
                <div dangerouslySetInnerHTML={formatMessage(chat.message)} />

              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ChatComponent;