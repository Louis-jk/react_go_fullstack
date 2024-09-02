'use client';

const TestPage = () => {
  const onClick = () => {
    console.log('Clicked!');
  };

  return <div onClick={onClick}>TestPage</div>;
};

export default TestPage;
