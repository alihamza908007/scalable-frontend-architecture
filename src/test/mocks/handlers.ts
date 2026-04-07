import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('*/api/login', async ({ request }) => {
    const { email, password } = (await request.json()) as any;

    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({
        user: { id: '1', email: 'test@example.com', name: 'Test User' },
        token: 'test-token',
      });
    }

    return new HttpResponse(null, { status: 401 });
  }),
];
