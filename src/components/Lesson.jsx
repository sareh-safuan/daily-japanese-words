import React, { useState } from 'react'
import parse from 'html-react-parser'

const Board = ({ words }) => {
    const [index, setIndex] = useState(0)

    return (
        <div className="card">
            <div className="card-body">
                {/* <p>{words[index].vPos}</p> */}
                <div>
                    <span style={{
                        fontSize: '32px',
                        fontWeight: '600',
                        marginRight: '0.75rem'
                    }}>{words[index].vKana}</span>
                    <span>[ {words[index].vExp} ]</span>
                </div>
                <div>
                    <span className="text-muted">Translation: </span>
                    <span className="font-weight-bold">{words[index].vMean}</span>
                </div>

                <div className="mt-3 mb-2">
                    <span className="text-monospace">Usage example:</span>
                </div>
                <ul>
                    <li>
                        <span style={{
                            fontWeight: '500',
                            fontSize: '20px'
                        }}>{parse(words[index].sKana
                            .replace(/<b>/, '<span class="text-danger font-weight-bold">')
                            .replace(/<\/b>/, '</span>'))}
                        </span>
                    </li>
                    <li>
                        <span style={{
                            fontWeight: '500',
                            fontSize: '20px'
                        }}>{parse(words[index].sExp
                            .replace(/<b>/, '<span class="text-danger font-weight-bold">')
                            .replace(/<\/b>/, '</span>'))}
                        </span>
                    </li>
                </ul>
                <div className="mt-2">
                    <span className="text-muted">Translation: </span>
                    <span className="font-weight-bold">{words[index].sMean}</span>
                </div>

                <div className="mt-3">
                    <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => { setIndex(index - 1) }}
                        disabled={0 === index}
                    >
                        Prev
                    </button>
                    <button
                        className="btn btn-sm btn-outline-success ml-1"
                        onClick={() => { setIndex(index + 1) }}
                        disabled={9 === index}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Board