import React from "react";
import {QueryClient, QueryClientProvider} from 'react-query'
import {Comics} from "./comics/containers/Comics";
import './App.css';

const queryClient = new QueryClient()

function App() {
    return (
        <div className="App">
            <QueryClientProvider client={queryClient}>
                <Comics/>
            </QueryClientProvider>
        </div>
    );
}

export default App;
