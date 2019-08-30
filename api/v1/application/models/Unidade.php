<?php

require_once(MODELS_DIR . 'BaseModel.php');

class Unidade extends BaseModel
{
    private static $TABELA = "unidade";

    function get_tabela(){
        return self::$TABELA;
    }

    public function get_por_curso_id($curso_id){
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->where('curso_id', $curso_id);
        $query = $this->db->get();
        return $query->result();
    }

    public function possui_materiais_vinculados($id)
    {
        $this->db->select('count(mat.id)');
        $this->db->from($this->get_tabela(). " uni");
        $this->db->join("material mat", "uni.id = mat.unidade_id");
        $this->db->where('uni.id', $id);
        $this->db->group_by('uni.id');
        
        $query = $this->db->get();
        return boolval(count($query->result_array()) > 0);
    }

    public function persistir($usuario)
    {
        return  parent::persiste($usuario, $this->get_tabela());
    }

    public function remover($usuario)
    {
        return  parent::remove($usuario['id'], 'id');
    }

}