'use client'
import './style.css';

import ReactDOMServer from 'react-dom/server';

type typeProps = 'error' | 'success' | 'info' | 'warning'

const Toast = (text: string, type: typeProps) => {

  // Create a new element on body
  const { id, jsx } = ToastElement({ text, type });
  const toaNode = ReactDOMServer.renderToStaticMarkup(jsx);
  document.body.insertAdjacentHTML('beforeend', toaNode);
  // remove the toast after 5 seconds
  setTimeout(() => {
    const el = document.getElementById(id)
    if (!el) return
    el.classList.add('inactive');
    setTimeout(() => {
      document.body.removeChild(el);
    }, 300)
  }, 5000)

}

const ToastElement = ({ text, type } : { text: string, type: typeProps }) => {
  
  const rand = "id-" + Math.floor(Math.random() * 9000)
  
  return {id: rand, jsx: (
    <div className={`toast ${type}`} id={rand}>
      <div className="toast-content">
        <div className="message">
          {text}
        </div>
      </div>
    </div>
  )}}

export default Toast