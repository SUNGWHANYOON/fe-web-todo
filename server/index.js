const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const all = JSON.parse(fs.readFileSync('./server/todos.json', 'utf8'));
const { user, data, log } = all;

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

app.get('/all', (req, res) => {
  res.send(all);
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

  log.push({
    action: '추가',
    from: null,
    to: title,
    task: 'section',
  });

  res.send(data);
});

// DELETE : section 삭제하기
app.delete('/section/:id', (req, res) => {
  const { id } = req.params;
  const deleteIdx = data.findIndex((section) => section.id === parseInt(id));

  if (deleteIdx === -1)
    return res.status(404).send(`존재하지 않는 섹션 id = ${deleteIdx}입니다 `);

  const deletedSection = data.splice(deleteIdx, 1);

  log.push({
    action: '삭제',
    from: null,
    to: deletedSection.title,
    task: 'section',
  });

  res.send(data);
});

// PATCH : 해당 섹션의 제목 수정하기
app.patch('/section/:id', (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const findIdx = data.findIndex((section) => section.id === parseInt(id));
  if (findIdx === -1)
    return res.status(404).send(`존재하지 않는 섹션 id = ${id}입니다 `);

  log.push({
    action: '수정',
    from: data[findIdx].sectionName,
    to: title,
    task: 'section',
  });

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

  let findIdx, deletedTodo;
  data.forEach(({ todos }) => {
    todos.forEach((todo, idx) => {
      if (todo.id === parseInt(id)) {
        findIdx = idx;
        deletedTodo = todos.splice(findIdx, 1);
      }
    });
  });

  if (findIdx === undefined)
    res.status(404).send(`존재하지 않는 todo id = ${id}입니다`);

  if (!([deletedTodo].type === 'new')) {
    log.push({
      action: '삭제',
      from: data[findIdx].sectionName,
      to: [deletedTodo].title,
      task: 'todo',
    });
  }

  res.send(data);
});

// PATCH : 해당 todo id값을 가진 todo수정
app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, type } = req.body;

  let findIdx, prevTitle, prevType;
  data.forEach(({ todos }) => {
    todos.forEach((todo, idx) => {
      if (todo.id === parseInt(id)) {
        findIdx = idx;
        prevTitle = todos[findIdx].title;
        prevType = todos[findIdx].type;
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

  if (prevType === 'new') {
    log.push({
      action: '추가',
      from: null,
      to: title,
      task: 'todo',
    });
  } else {
    log.push({
      action: '수정',
      from: prevTitle,
      to: title,
      task: 'todo',
    });
  }
  res.send(data);
});

app.get('/log', (req, res) => {
  res.send(log);
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
