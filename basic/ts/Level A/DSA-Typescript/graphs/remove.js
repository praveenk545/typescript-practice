buildGraph=(edges)=>{
  
    const graph=new Map();

    for(let node of edges){
        const key=node?.new_status;
        if(!graph.has(key)){
            graph.set(key,[])
        }
        graph.get(key).push(node)
    }
    return graph;
}

  getResulst=(values)=> {
    const res = this.buildGraph(values);
    const requesterUser = res.get('Submitted')?.[0]?.updatedBy;
    const acknowledgedUser = res.get('Acknowledged')?.[0]?.updatedBy;
    if (res.has('Submitted') && requesterUser) {
      const filtered = res.get('Submitted').filter(item => item.updatedBy === requesterUser); 

      res.set('Submitted', filtered);
    }
    return Array.from(res.values()).flat();
  }

  let value=[];
  const finalResponse=getResulst(value)

console.log(finalResponse);
