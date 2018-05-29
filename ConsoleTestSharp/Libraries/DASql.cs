
using Microsoft.VisualBasic;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;

using System.Data.SqlClient;
using Newtonsoft.Json;
using System.Text;

namespace DataAccess
{
    public class DASql
    {

        //Private _connectionString As String

        private SqlConnection _cn;
        private static readonly Dictionary<string, string[]> dics = new Dictionary<string, string[]> {
            { "sizes" , new string[] { "small", "medium", "large"} },
            { "colors", new string[] { "black", "red", "brown" } },
            { "shapes", new string[] { "circle", "square" } }
        };

        public DASql(string connectionString)
        {
            //_connectionString = connectionString
            _cn = new SqlConnection(connectionString);
        }


        // Ejecutando sql o SP retornando DataTable o Objeto
        // sCmdType = sp|table|sql
        // sExecType = Reader|Scalar|NonQuery
        // dParams (para sp) = { {key, value}, { }, ... }
        public object objSqlResult(string sCmdSql, string sCmdType = "sql", string sExecType = "NonQuery", Dictionary<string, object> dParams = null)
        {

            _cn.Open();

            // Tipos de Comandos (sp=StoredProcedured, table=TableDirect, sql=Text)
            Dictionary<string, int> dCmdType = new Dictionary<string, int> {
                { "sp", 4 },
                { "table", 1 },
                { "sql", 1 }
                //{"table", 512} error!
            };

            using (SqlCommand cmd = _cn.CreateCommand())
            {
                cmd.CommandType = (CommandType)dCmdType[sCmdType];
                cmd.CommandText = sCmdType == "table" ? "SELECT * FROM " : "" + sCmdSql;

                // Aunq se defina sCmdType como 'sp' no garantiza que tendra parametros
                if ((dParams != null))
                {
                    AddParameters(cmd, dParams);
                }

                // Tipo de Ejecucion
                switch (sExecType)
                {
                    case "Reader":

                        try {
                            // Almacenamos la lista de DataTable's
                            DataSet ds = new DataSet();
                            // Leyendo la BD
                            using (SqlDataReader dr = cmd.ExecuteReader()) {
                                // Almacenado el reader en el DataSet
                                while (!dr.IsClosed) {
                                    // Adicionando DataTable y Cargandolo de Datos
                                    ds.Tables.Add().Load(dr);
                                }
                            }
                            // cerrando conexion
                            _cn.Close();
                            // Devolviendo DataSet lleno
                            return ds;
                        } catch (Exception ex) {
                            throw ex;
                        }

                        break;
                    case "Scalar":
                        // Retornando un valor tipo Object
                        object resScalar = cmd.ExecuteScalar();
                        _cn.Close();
                        return resScalar;
                    default:
                        //Case "NonQuery"
                        // Retorna un valor numerico (Numero de row afectados)
                        int resNonQuery = cmd.ExecuteNonQuery();
                        _cn.Close();
                        return resNonQuery;
                }
            }
        }

        public string strJsonSqlResult(string sCmdSql, string sCmdType = "sql", string sExecType = "NonQuery", Dictionary<string, object> dParams = null)
        {

            object objSqlResult = this.objSqlResult(sCmdSql, sCmdType, sExecType, dParams);
            Dictionary<string, object> dicResult = new Dictionary<string, object>();
            string strJsonResult = "";

            dicResult.Add("success", true);
            dicResult.Add("data", objSqlResult);
            dicResult.Add("message", "todo ok!!!");

            strJsonResult = JsonConvert.SerializeObject(dicResult, Formatting.None);

            return strJsonResult;

        }


        public byte[] strCsvSqlResult(string sCmdSql, string sCmdType = "sql", string sExecType = "NonQuery", Dictionary<string, object> dParams = null)
        {

            DataSet dsSqlResult = (DataSet)this.objSqlResult(sCmdSql, sCmdType, sExecType, dParams);
            DataTable dtTable1 = dsSqlResult.Tables[0];

            //Dim dicResult As New Dictionary(Of String, Object)
            string strJsonResult = "";

            //--------Columns Name--------------------------------------------------------------------------- 
            StringBuilder sb = new StringBuilder();
            int intClmn = dtTable1.Columns.Count;

            int i = 0;
            for (i = 0; i <= intClmn - 1; i += i + 1)
            {
                sb.Append("\"" + dtTable1.Columns[i].ColumnName.ToString() + "\"");
                if (i == intClmn - 1)
                {
                    sb.Append(" ");
                }
                else
                {
                    sb.Append(",");
                }
            }
            sb.Append(Environment.NewLine); // VB Constants.vbNewLine

            //--------Data By  Columns--------------------------------------------------------------------------- 

            //DataRow row = default(DataRow);

            foreach (DataRow row in dtTable1.Rows)
            {
                int ir = 0;
                for (ir = 0; ir <= intClmn - 1; ir += ir + 1)
                {
                    sb.Append("\"" + row[ir].ToString().Replace("\"", "\"\"") + "\"");
                    if (ir == intClmn - 1) {
                        sb.Append(" ");
                    } else {
                        sb.Append(",");
                    }
                }
                sb.Append(Environment.NewLine);
            }

            return System.Text.Encoding.UTF8.GetBytes(sb.ToString());

        }

        // Ejecuta un SP y lo Retorna en un DataTable
        public DataTable dtSpResult(string sCmdText, Dictionary<string, object> dParams)
        {
            DataTable dt = new DataTable();
            try {
                _cn.Open();
                SqlCommand cmd = this.BuildCommand(sCmdText, dParams);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
                _cn.Close();
            }
            catch {
            }

            return dt;
        }
        
        // ---
        private SqlCommand BuildCommand(string cmdTxt, Dictionary<string, object> @params)
        {
            using (SqlCommand cmd = _cn.CreateCommand())
            {
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = cmdTxt;
                AddParameters(cmd, @params);
                return cmd;
            }
        }

        // @ se usa para nombrar variable con nombres reservados
        private void AddParameters(SqlCommand cmd, Dictionary<string, object> @params)
        {
            if ((@params != null))
            {
                foreach (KeyValuePair<string, object> kvp in @params)
                {
                    cmd.Parameters.AddWithValue(kvp.Key, kvp.Value);
                }
            }
        }

    }

}
