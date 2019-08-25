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

}