import * as React from 'react'
import Container from '@mui/material/Container'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const markdown = `
# Andrew Agile

## Platform intro
A web application serves as an agile platform, with similar functionalities as Jira and Trello.

## Main concepts
### Workspace
TBD

### Project
TBD

### Task
TBD

## User guide
TBD

## Contact
+ [Nianyi Guo](https://github.com/jujujulia123)
+ [Yucen Xu](https://github.com/YucenXu)
+ [Zhiqi Li](https://github.com/Angelica-Lee)
+ [Peng Zhao](https://github.com/zp9763)
`

export default function Help () {
  return (
    <Container maxWidth="sx" sx={{ mt: 12 }}>
      <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]}/>
    </Container>
  )
}
