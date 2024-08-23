import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';

export default function Counter() {
    const [count, setCount] = useState(0);

    //   const increment = () => setCount(count + 1);
    //   const decrement = () => setCount(count - 1);

    return (
        <div>
            <Badge bg="secondary">{count}</Badge>
        </div>
    );
}
