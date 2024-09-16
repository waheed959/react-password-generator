import { useState,useCallback, useEffect,useRef } from 'react' ;

function App() {
  const [length,setLength] = useState(8);
  const [numberAlllowed,setNumberAllowed]= useState(false);
  const [charAllowed,setCharAllowed]= useState(false);
  const [password,setPassword]= useState("");
  const [buttonText,setButtonText]= useState("copy") ;
  const [buttonColor,setButtonColor] = useState("blue")
  //refHook

  const passwordREf = useRef(null)

  const copyTexttoClipBoard=useCallback(()=>{
    setButtonText("copied")
    setButtonColor('green');
    passwordREf.current?.select()
    passwordREf.current?.setSelectionRange(0,101 )
    window.navigator.clipboard.writeText(password)
  },[password])

useEffect(()=>{
  setButtonText("Copy")
  setButtonColor("blue")
},[length,charAllowed,numberAlllowed])



  const passwordGenerator=useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVXWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAlllowed){
      str+="0123456789";
    };
    if(charAllowed){
      str+= "~!@#$%^&*"
    };
    for(let i = 1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length)+1
      pass+=str.charAt(char);
      
    };

    setPassword(pass);
    
  },[length,numberAlllowed,charAllowed,setPassword]);

  useEffect(()=>{
    passwordGenerator()
  },[numberAlllowed,charAllowed,length,passwordGenerator]);
  
  return (
     <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        {/* Remove the extra double quotes here */}
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            ref={passwordREf}
            readOnly
          />
          <button className= {`outline-none text-white px-3 py-0.5 shrink-0 ${buttonColor === "green" ? "bg-green-500" : "bg-blue-700"}`}
          onClick={copyTexttoClipBoard}
          
          >{buttonText}</button>
           
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
             type="range" 
             min={8}
             max={100}
             value={length}
             className='cursor-pointer'
             onChange={(e)=>{
              setLength(e.target.value)
             }}
             
             />
             <label>length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={numberAlllowed}
            id='numberInput'
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }} />            
            <label> Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" 
            defaultChecked={charAllowed}
            id='numberInput'
            onChange={()=>{
              setCharAllowed((prev)=>!prev)
            }} />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </> 
  )
}

export default App;


