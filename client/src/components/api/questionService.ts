export interface Question {
  category: string;
  type: 'boolean';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface FetchQuestionsParams {
  amount: number;
}

export async function fetchQuestions({ amount }: FetchQuestionsParams): Promise<Question[]> {
  const url = new URL('https://opentdb.com/api.php');
  url.searchParams.set('amount', amount.toString());
  // url.searchParams.set('category', category.toString());
  url.searchParams.set('type', 'boolean');

  const response = await fetch(url.toString());
  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error(`API Error ${data.response_code}: ${getErrorMessage(data.response_code)}`);
  }
  
  return data.results;
}

function getErrorMessage(code: number): string {
  switch(code) {
    case 1: return 'No results found';
    case 2: return 'Invalid parameters';
    case 3: return 'Session expired';
    case 4: return 'Rate limited';
    default: return 'Unknown error';
  }
}