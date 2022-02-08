const binutils = require("binutils");
const { ReadChar } = require("../functions");

const ReadStatic = (m_static) => {
    const m_static_length = 820;
    const FileStatic_Path = "Local\\acpmf_static";
    const m_static_buffer = Buffer.alloc(m_static_length);
  
    m_static.createMapping(null, FileStatic_Path, m_static_length);
  
    m_static.readInto(0, m_static_length, m_static_buffer);
  
    let result = {}
    const reader = new binutils.BinaryReader(m_static_buffer, 'little')
  
    result.smVersion = []
    for(let i = 0; i < 15; i++)
        result.smVersion.push(ReadChar(reader))
  
    result.acVersion = []
    for(let i = 0; i < 15; i++)
        result.acVersion.push(ReadChar(reader))
  
    result.numberOfSessions = reader.ReadUInt32()
    result.numCars = reader.ReadUInt32()
  
    result.carModel = []
    for(let i = 0; i < 33; i++)
        result.carModel.push(ReadChar(reader))
  
    result.track = []
    for(let i = 0; i < 33; i++)
        result.track.push(ReadChar(reader))
  
    result.playerName = []
    for(let i = 0; i < 33; i++)
        result.playerName.push(ReadChar(reader))
  
    result.playerSurname = []
    for(let i = 0; i < 33; i++)
        result.playerSurname.push(ReadChar(reader))
  
    result.playerNick = []
    for(let i = 0; i < 34; i++)
        result.playerNick.push(ReadChar(reader))
  
        return result;
  }

  module.exports = ReadStatic;