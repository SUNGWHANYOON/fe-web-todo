const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const { data } = JSON.parse(fs.readFileSync('./server/todos.json', 'utf8'));

app.use(
  cors({
    origin: 'http://localhost:1234',
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/sections', (req, res) => {
  res.send(data);
});

// GET : 해당 section ID 값을 가진 데이터 반환
app.get('/sections/:id', (req, res) => {
  const { id } = req.params;
  const section = data.find((section) => section.id === parseInt(id));
  if (!section) res.status(404).send(`존재하지 않는 todo id = ${id}입니다`);
  res.send(section);
});

// POST : section 만들기 !
app.post('/section', (req, res) => {
  const { title } = req.body;
  const newSection = {
    id: Date.now(),
    sectionName: title,
    todos: [],
  };
  data.push(newSection);

  res.send(data);
});

// DELETE : section 삭제하기
app.delete('/section/:id', (req, res) => {
  const { id } = req.params;
  const deleteIdx = data.findIndex((section) => section.id === parseInt(id));

  if (deleteIdx === -1)
    return res.status(404).send(`존재하지 않는 섹션 id = ${deleteIdx}입니다 `);

  data.splice(deleteIdx, 1);
  res.send(data);
});

// PATCH : 해당 섹션의 제목 수정하기
app.patch('/section/:id', (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const findIdx = data.findIndex((section) => section.id === parseInt(id));
  if (findIdx === -1)
    return res.status(404).send(`존재하지 않는 섹션 id = ${id}입니다 `);

  data[findIdx].sectionName = title;
  res.send(data);
});

// GET : 해당 id값을 가진 todo 출력
app.get('/todos/:id', (req, res) => {
  const { id } = req.params;

  let findTodo;
  data.forEach(({ todos }) => {
    todos.forEach((todo) => {
      if (todo.id === parseInt(id)) findTodo = todo;
    });
  });

  if (!findTodo) res.status(404).send(`존재하지 않는 todo id = ${id}입니다`);
  res.send(findTodo);
});

// POST : 해당 section id값을 가진 todos에 todo추가
app.post('/section/:id/todo', (req, res) => {
  const { id } = req.params;
  const { title = '', content = '' } = req.body;

  const findIdx = data.findIndex((section) => section.id === parseInt(id));

  if (findIdx === -1)
    return res.status(404).send(`존재하지 않는 섹션 id = ${findIdx}입니다 `);

  data[findIdx].todos.push({
    id: Date.now(),
    title,
    content,
    type: 'new',
  });

  res.send(data);
});

// DELETE : 해당 todo id값을 가진 todo를 삭제
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  let findIdx;
  data.forEach(({ todos }) => {
    todos.forEach((todo, idx) => {
      if (todo.id === parseInt(id)) {
        findIdx = idx;
        todos.splice(findIdx, 1);
      }
    });
  });

  if (findIdx === undefined)
    res.status(404).send(`존재하지 않는 todo id = ${id}입니다`);

  res.send(data);
});

// PATCH : 해당 todo id값을 가진 todo수정
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, type } = req.body;

  let findIdx;
  data.forEach(({ todos }) => {
    todos.forEach((todo, idx) => {
      if (todo.id === parseInt(id)) {
        findIdx = idx;
        todos[findIdx] = {
          ...todos[findIdx],
          title,
          content,
          type,
        };
      }
    });
  });

  if (findIdx === undefined)
    res.status(404).send(`존재하지 않는 todo id = ${id}입니다`);

  res.send(data);
});

app.get('*', (req, res) => {
  res.status(404).send(`존재하지 않는 url입니다`);
});
app.post('*', (req, res) => {
  res.status(404).send(`존재하지 않는 url입니다`);
});
app.patch('*', (req, res) => {
  res.status(404).send(`존재하지 않는 url입니다`);
});
app.delete('*', (req, res) => {
  res.status(404).send(`존재하지 않는 url입니다`);
});

app.listen(8080, () => {
  console.log('listen to localhost:8080...');
});
