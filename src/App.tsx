import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [amount, setAmount] = useState("")
  const [interest, setInterest] = useState("")
  const [tradeDays, setTradeDays] = useState("")
  const [err, setErr] = useState("")
  const [result, setResult] = useState<Array<Number>>([])

  const [inputWidth, setInputWidth] = useState<number>()
  const [inputHeight, setInputHeight] = useState<number>()

  useEffect(() => {
    setButtonWidth()
    window.addEventListener("resize", setButtonWidth)
    return () => window.removeEventListener('resize', setButtonWidth)
  }, [])

  function setButtonWidth() {
    setInputWidth(document.getElementById("fname")?.getBoundingClientRect().width)
    setInputHeight(document.getElementById("fname")?.getBoundingClientRect().height)
  }

  function calculateAmount(e : any) {
    e.preventDefault()
    
    let amount_num = parseInt(amount)
    if(!amount_num) {
      setErr("unable to parse amount")
      return
    }

    let interst_float = parseFloat(interest)
    if(!interst_float) {
      setErr("unable to parse interest")
      return
    }

    let tradeDays_num = parseInt(tradeDays)
    if(!tradeDays_num) {
      setErr("unable to parse trade days")
      return
    }

    interst_float = interst_float * 0.01
    let result = [amount_num]
    for(let i = 0; i < tradeDays_num; ++i) {
      result.push(result[result.length - 1] + (result[result.length - 1] * interst_float))
    }
    setResult(result)
  }
  
  return <div style={{display: "grid", height: "100%", width: "100%", placeContent: "center"}}>
        <h3 style={{placeSelf: "center", fontWeight: "lighter", textDecoration: "underline"}}>Fin Tech Trade Firm</h3>
        <div className='form'>          
          <label htmlFor="fname">Starting Amount:</label><br />
          <input onChange={(e) => setAmount(e.currentTarget.value)} style={{marginBottom: ".25rem"}} type="text" id="fname" name="fname" /><br />
        
          <label htmlFor="lname">Interest (Percent:)</label><br />
          <input onChange={(e) => setInterest(e.currentTarget.value)}  style={{marginBottom: ".25rem"}} type="text" id="lname" name="lname" /><br />
      
          <label htmlFor="days">Trade Days</label><br />
          <input onChange={(e) => setTradeDays(e.currentTarget.value)}  style={{marginBottom: ".50rem"}} type="text" id="days" name="days" /><br />
        
          <button onClick={calculateAmount} value="Submit" style={{width: inputWidth, height: inputHeight! * 1.1, backgroundColor: "azure", border: "solid azure .1rem", borderRadius: ".10rem"}} >Submit</button>
          {
            err ? <p>{err}</p> : <></>
          }
          {
            result.length != 0 && !err ? 
            <div style={{display: "flex", flexDirection: "column", overflowY: "scroll", height: "40vh"}}>
              {
                result.map((p, i) => <p style={{margin: 0}}>{i + ":   " + p.toString()}</p>) 
              }
            </div>
            : <></>
          }
      </div> 
  </div> 
}

export default App
