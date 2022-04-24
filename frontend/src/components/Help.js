import * as React from 'react'
import Container from '@mui/material/Container'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import UserManual from '../UserManual.md'

export default function Help () {
  const [markdown, setMarkdown] = React.useState('')

  React.useEffect(() => {
    fetch(UserManual).then(
      file => file.text(),
    ).then(
      text => setMarkdown(text),
    ).catch(console.error)
  }, [])

  return (
    <Container maxWidth="sx" sx={{ mt: 12 }}>
      <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]}/>
    </Container>
  )
}
