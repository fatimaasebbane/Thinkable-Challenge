import { PrismaClient } from '@prisma/client';
import { GET, POST, DELETE, PUT } from '../src/app/posts/route'; 
import { NextRequest } from 'next/server';

const prisma = new PrismaClient();

describe('API Handlers', () => {
    beforeAll(async () => {
        await prisma.$connect();
      }, 10000); 
      

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.post.deleteMany(); 
  });

  test('GET posts', async () => {
    const req = new NextRequest('http://localhost:3000/posts');
    const res = await GET(req);

    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.posts).toEqual([]);
  });

  test('POST a new post', async () => {
    const req = new NextRequest('http://localhost:3000/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: 'New Post',
        content: 'This is a new post',
      }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.post).toHaveProperty('id');
    expect(json.post.title).toBe('New Post');
    expect(json.post.content).toBe('This is a new post');
  });

  test('DELETE a post', async () => {
    const post = await prisma.post.create({
      data: {
        title: 'Post to delete',
        content: 'This post will be deleted',
      },
    });

    const req = new NextRequest(`http://localhost:3000/posts?id=${post.id}`, {
      method: 'DELETE',
    });

    const res = await DELETE(req);
    expect(res.status).toBe(200);

    const deletedPost = await prisma.post.findUnique({
      where: { id: post.id },
    });
    expect(deletedPost).toBeNull();
  });

  test('PUT update a post', async () => {
    const post = await prisma.post.create({
      data: {
        title: 'Post to update',
        content: 'This post will be updated',
      },
    });

    const req = new NextRequest('http://localhost:3000/posts', {
      method: 'PUT',
      body: JSON.stringify({
        id: post.id,
        title: 'Updated Post',
        content: 'This post has been updated',
      }),
    });

    const res = await PUT(req);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.post.title).toBe('Updated Post');
    expect(json.post.content).toBe('This post has been updated');
  });
});
