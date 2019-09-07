<?php

require_once(MODELS_DIR . 'BaseModel.php');

class Usuario extends BaseModel
{
    private static $TABELA = "usuario";

    function get_tabela(){
        return self::$TABELA;
    }

    public function login($login, $sen)
    {
        $this->db->select('id,email');
        $this->db->where('email', $login);
        $this->db->where('senha', strtoupper(md5($sen)));
        $query = $this->db->get(self::$TABELA);
        if ($query->num_rows() > 0) {
            $query->result_array()[0];
        } else {
            return false;
        }
    }

     public function get_registro_por_email($email)
    {
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->where('email', $email);
        $query = $this->db->get();
        if ($query->num_rows() > 0)
            return $query->result_array()[0];
        else
            return false;
    }

    public function persistir($usuario)
    {
        $usuario['senha'] = strtoupper(hash('sha256', $usuario['senha']));
        $usuario['ativo'] = TRUE;
        return  parent::persiste($usuario, $this->get_tabela());
    }

    public function remover($usuario)
    {
        return  parent::remove($usuario['id'], 'id');
    }

    public function get_detalhes($usuario_id){
        $query = $this->db->query("SELECT c.id as cursoId,uni.id as unidadeId,uni.titulo as unidadeTitulo, c.titulo as cursoTitulo, m.titulo as materialTitulo, m.tipo, m.url,(SELECT sum(inte.percentual) from interacao where material_id = m.id  ) AS percentual,u.id as usuarioId,u.nome as usuarioNome,u.email as usuarioEmail,u.data_cadastro as usuarioDataCadastro
            FROM
                usuario u
                    JOIN
                inscricao_dados id ON id.usuario_id = u.id
                    JOIN
                inscricao inc ON inc.id = id.inscricao_id
                    JOIN
                curso c ON c.id = id.curso_id
                    JOIN
                unidade uni ON uni.curso_id = c.id
                    JOIN
                material m ON m.unidade_id = uni.id
                left  JOIN
                interacao inte ON inte.material_id = m.id
                    AND inte.inscricao_id = inc.id
                where u.id =".$usuario_id."
                group by m.id");
        if (count($query->result_array()) > 0)
            return $query->result();
        else
            return false;
    }

}