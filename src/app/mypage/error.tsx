'use client'



export default function Error({error, reset}:any){

  return (
    <div>
      <h4>에러</h4>
      <button onClick={()=>{ reset() }}>다시시도</button>
    </div>
  )
}