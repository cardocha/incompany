<?php

require_once(MODELS_DIR . 'BaseModel.php');

class Material extends BaseModel
{
    private static $TABELA = "material";

    function get_tabela(){
        return self::$TABELA;
    }

    public function get_por_unidade_id($unidade_id){
        $this->db->select('*');
        $this->db->from($this->get_tabela());
        $this->db->where('unidade_id', $unidade_id);
        $this->db->order_by('tipo, titulo');
        $query = $this->db->get();
        return $query->result();
    }

    public function get_por_id($id){
         $this->db->select('mat.*,
        uni.id as unidadeId,
        uni.titulo as unidadeTitulo,
        cur.id as cursoId,
        cur.titulo as cursoTitulo');
        $this->db->from($this->get_tabela().' mat');
        $this->db->join('unidade uni','  uni.id = mat.unidade_id');
        $this->db->join('curso cur','  cur.id = uni.curso_id');
        $this->db->where('mat.id', $id);
        $query = $this->db->get();
        return $query->result_array()[0];
    }

    public function persistir($material)
    {
        return  parent::persiste($material, $this->get_tabela());
    }

    public function remover($material)
    {
        return  parent::remove($material['id'], 'id');
    }

}