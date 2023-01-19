import React, { useState } from 'react'
import { Document, Page } from 'react-pdf/dist/esm/entry.vite'
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { Layout, Typography, Divider } from 'antd'

import useBreakpoint from '../hooks/useBreakpoint'
import { WHITE_COLOR } from '../global/GlobalVars'

import documentation from '../docs/documentacion.pdf'

const { Header, Content } = Layout
const { Title } = Typography

const Docs = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const breakpoint = useBreakpoint()

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
    setPageNumber(1)
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <Layout>
      {breakpoint > 880 && (
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
          }}
        >
          <Title level={2} style={{ color: WHITE_COLOR, margin: '10px', padding: '0px', textAlign: 'center' }}>Documentación</Title>
        </Header>
      )}
      <Content style={{ background: WHITE_COLOR }}>
        {breakpoint <= 880 && (
          <Title level={2} style={{ textAlign: 'center' }}>Acerca del desarrollador</Title>
        )}
        <div style={styles.pdfContainer}>
          <Document file={documentation} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <p style={{ textAlign: 'center' }}>
              Página {pageNumber || (numPages ? 1 : '--')} de {numPages || '--'}
            </p>
            <button
              type="button"
              disabled={pageNumber <= 1}
              onClick={previousPage}
            >
              Anterior
            </button>
            <Divider type="vertical" />
            <button
              type="button"
              disabled={pageNumber >= numPages}
              onClick={nextPage}
            >
              Siguiente
            </button>
          </div>
        </div>
      </Content>
    </Layout>
  )
}

const styles = {
  pdfContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10%',
    paddingTop: '5%',
  }
}

export default Docs